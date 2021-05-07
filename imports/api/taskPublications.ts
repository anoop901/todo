import { Meteor } from "meteor/meteor";
import { TaskCollection } from "./Task";

Meteor.publish("task", function publishTasks() {
  if (this.userId === null) {
    throw new Meteor.Error("Not authorized.");
  }
  return TaskCollection.find({ owner: this.userId });
});
