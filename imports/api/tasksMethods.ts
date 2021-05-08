import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/Task";
import { check, Match } from "meteor/check";

Meteor.methods({
  "tasks.new"(name, plannedDate) {
    check(name, String);
    check(plannedDate, Match.Maybe(Date));
    plannedDate = plannedDate ?? undefined;

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      owner: this.userId,
      name,
      state: "pending",
      plannedDate,
    });
  },

  "tasks.setName"(taskId, name) {
    check(taskId, String);
    check(name, String);
    const existingTask = TasksCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(taskId, { $set: { name } });
  },

  "tasks.setPlannedDate"(taskId, plannedDate) {
    check(taskId, String);
    check(plannedDate, Match.Maybe(Date));
    const existingTask = TasksCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    if (plannedDate === null) {
      TasksCollection.update(taskId, { $unset: { plannedDate: 0 } });
    } else {
      TasksCollection.update(taskId, { $set: { plannedDate } });
    }
  },

  "tasks.setState"(taskId, state) {
    check(taskId, String);
    check(state, Match.OneOf("pending", "complete", "dropped"));
    const existingTask = TasksCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(taskId, { $set: { state } });
  },

  "tasks.delete"(taskId) {
    check(taskId, String);
    const existingTask = TasksCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.remove(taskId);
  },
});
