import React from "react";
import { Task, TaskCollection } from "../api/Task";
import "./TaskListItem.css";

export function TaskListItem({ task }: { task: Task }) {
  return (
    <li className="TaskListItem">
      <input
        className="TaskListItemCheckbox"
        type="checkbox"
        checked={task.state === "complete"}
        onChange={(e) => {
          const checked = e.currentTarget.checked;
          if (checked) {
            TaskCollection.update(
              { _id: task._id },
              { $set: { state: "complete" } }
            );
          } else {
            TaskCollection.update(
              { _id: task._id },
              { $set: { state: "incomplete" } }
            );
          }
        }}
      />
      {task.name}
    </li>
  );
}
