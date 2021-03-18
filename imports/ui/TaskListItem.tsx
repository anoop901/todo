import React from "react";
import { Task } from "../api/Task";
import "./TaskListItemStyle.css";

export function TaskListItem({ task }: { task: Task }) {
  return <li className="TaskListItem">{task.name}</li>;
}
