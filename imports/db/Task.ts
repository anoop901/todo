import { Mongo } from "meteor/mongo";

type TaskState = "pending" | "complete" | "dropped";

export interface Task {
  _id: string;
  owner: string; // id in users table
  name: string;
  state: TaskState;
  plannedDate?: Date;
}

export const TasksCollection = new Mongo.Collection<Task>("tasks");
