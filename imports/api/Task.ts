import { Mongo } from "meteor/mongo";

export interface Task {
  _id: string;
  name: string;
}

export const TaskCollection = new Mongo.Collection<Task>("task");
