import classNames from "classnames";
import React from "react";
import { Task, TaskCollection } from "../api/Task";
import "./TaskListItemStyles.css";

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
        TaskListItemPending: task.state === "pending",
        TaskListItemComplete: task.state === "complete",
        TaskListItemDropped: task.state === "dropped",
      })}
      onClick={onClick}
    >
      <input
        className={classNames("TaskListItemCheckbox", {
          TaskListItemCheckboxDropped: task.state === "dropped",
        })}
        type="checkbox"
        disabled={task.state === "dropped"}
        checked={task.state === "complete"}
        onClick={(e) => {
          e.stopPropagation();
        }}
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
              { $set: { state: "pending" } }
            );
          }
        }}
      />
      {task.name}
    </li>
  );
}
