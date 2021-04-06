import { List } from "@material-ui/core";
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
    <p className="TaskListEmpty">No tasks yet.</p>
  ) : (
    <List>
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
    </List>
  );
}
