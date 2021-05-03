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
});
