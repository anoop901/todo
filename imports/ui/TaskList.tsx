import { List, makeStyles } from "@material-ui/core";
import React from "react";
import { Task } from "../api/Task";
import { TaskListItem } from "./TaskListItem";

const useStyles = makeStyles({
  empty: {
    textAlign: "center",
    paddingTop: "30px",
    fontSize: "small",
    color: "#888",
    fontStyle: "italic",
  },
});

export function TaskList({
  tasks,
  selectedTaskId,
  setSelectedTaskId,
}: {
  tasks: Task[];
  selectedTaskId: string | null;
  setSelectedTaskId: (selectedTaskId: string | null) => void;
}) {
  const classes = useStyles();
  return tasks.length === 0 ? (
    <p className={classes.empty}>No tasks yet.</p>
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
