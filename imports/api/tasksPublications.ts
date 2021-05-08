import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/Task";

Meteor.publish("tasks", function publishTasks() {
  if (this.userId === null) {
    throw new Meteor.Error("Not authorized.");
  }
  return TasksCollection.find({ owner: this.userId });
});
