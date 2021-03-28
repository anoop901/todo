import { Mongo } from "meteor/mongo";

type TaskState = "incomplete" | "complete" | "dropped";

export interface Task {
  _id: string;
  name: string;
  state: TaskState;
}

export const TaskCollection = new Mongo.Collection<Task>("task");
