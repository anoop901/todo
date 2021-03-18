import React from "react";
import { Task } from "../api/Task";

export function TaskList({ tasks }: { tasks: Task[] }) {
  return tasks.length === 0 ? (
    <p>No tasks yet.</p>
  ) : (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.name}</li>
      ))}
    </ul>
  );
}
