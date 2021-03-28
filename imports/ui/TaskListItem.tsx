import classNames from "classnames";
import React from "react";
import { Task, TaskCollection } from "../api/Task";
import "./TaskListItem.css";

export function TaskListItem({
  task,
  onClick,
  selected,
}: {
  task: Task;
  onClick?: () => void;
  selected: boolean;
}) {
  return (
    <li
      className={classNames("TaskListItem", {
        TaskListItemSelected: selected,
        TaskListItemIncomplete: task.state === "incomplete",
        TaskListItemComplete: task.state === "complete",
        TaskListItemDropped: task.state === "dropped",
      })}
      onClick={onClick}
    >
      <input
        className="TaskListItemCheckbox"
        type="checkbox"
        disabled={task.state === "dropped"}
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
