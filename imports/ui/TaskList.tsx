import React from "react";
import { Task } from "../api/Task";
import { TaskListItem } from "./TaskListItem";
import "./TaskListStyles.css";

export function TaskList({
  tasks,
  selectedTaskId,
  setSelectedTaskId,
}: {
  tasks: Task[];
  selectedTaskId: string | null;
  setSelectedTaskId: (selectedTaskId: string | null) => void;
}) {
  return tasks.length === 0 ? (
    <p className="TaskList TaskListEmpty">No tasks yet.</p>
  ) : (
    <ul className="TaskList">
      {tasks.map((task) => (
        <TaskListItem
          selected={selectedTaskId == task._id}
          onClick={() => {
            setSelectedTaskId(task._id);
          }}
          key={task._id}
          task={task}
        />
      ))}
    </ul>
  );
}
