import { Meteor } from "meteor/meteor";
import { TaskCollection } from "./Task";
import { check, Match } from "meteor/check";

Meteor.methods({
  "task.new"(name, plannedDate) {
    check(name, String);
    check(plannedDate, Match.Maybe(Date));
    plannedDate = plannedDate ?? undefined;

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TaskCollection.insert({
      owner: this.userId,
      name,
      state: "pending",
      plannedDate,
    });
  },
  foo(x) {
    console.log(x);
  },

  "task.setName"(taskId, name) {
    check(taskId, String);
    check(name, String);
    const existingTask = TaskCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TaskCollection.update(taskId, { $set: { name } });
  },

  "task.setPlannedDate"(taskId, plannedDate) {
    check(taskId, String);
    check(plannedDate, Match.Maybe(Date));
    const existingTask = TaskCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    if (plannedDate === null) {
      TaskCollection.update(taskId, { $unset: { plannedDate: 0 } });
    } else {
      TaskCollection.update(taskId, { $set: { plannedDate } });
    }
  },

  "task.setState"(taskId, state) {
    check(taskId, String);
    check(state, Match.OneOf("pending", "complete", "dropped"));
    const existingTask = TaskCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TaskCollection.update(taskId, { $set: { state } });
  },

  "task.delete"(taskId) {
    check(taskId, String);
    const existingTask = TaskCollection.findOne(taskId);

    if (existingTask === undefined) {
      throw new Meteor.Error("Not found.");
    }
    if (!this.userId || this.userId !== existingTask.owner) {
      throw new Meteor.Error("Not authorized.");
    }

    TaskCollection.remove(taskId);
  },
});
