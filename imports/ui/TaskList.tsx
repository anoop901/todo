import React from "react";
import { Task } from "../api/Task";
import { TaskListItem } from "./TaskListItem";
import "./TaskListStyle.css";

export function TaskList({ tasks }: { tasks: Task[] }) {
  return tasks.length === 0 ? (
    <p className="TaskList TaskListEmpty">No tasks yet.</p>
  ) : (
    <ul className="TaskList">
      {tasks.map((task) => (
        <TaskListItem key={task._id} task={task} />
      ))}
    </ul>
  );
}
