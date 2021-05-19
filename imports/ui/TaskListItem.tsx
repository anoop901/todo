import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import format from "date-fns/format";
import { Meteor } from "meteor/meteor";
import React from "react";
import { Task } from "../db/Task";
import { useAppDispatch } from "./reducers/hooks";
import { setSelectedTask } from "./reducers/tasksViewSlice";

const useStyles = makeStyles((theme) => ({
  droppedCheckbox: { visibility: "hidden" },
  droppedText: {
    color: theme.palette.text.disabled,
    textDecorationLine: "line-through",
  },
  completeText: { color: theme.palette.text.disabled },
}));

export function TaskListItem({
  task,
  selected,
}: {
  task: Task;
  selected: boolean;
}): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  return (
    <ListItem
      button
      selected={selected}
      onClick={() => {
        dispatch(setSelectedTask(task._id));
      }}
    >
      <ListItemIcon>
        <Checkbox
          color="default"
          className={classNames({
            [classes.droppedCheckbox]: task.state === "dropped",
          })}
          disabled={task.state === "dropped"}
          checked={task.state === "complete"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            const checked = e.currentTarget.checked;
            if (checked) {
              Meteor.call("tasks.setState", task._id, "complete");
            } else {
              Meteor.call("tasks.setState", task._id, "pending");
            }
          }}
        />
      </ListItemIcon>
      <ListItemText
        className={classNames({
          [classes.completeText]: task.state === "complete",
          [classes.droppedText]: task.state === "dropped",
        })}
        primary={task.name}
        secondary={
          task.plannedDate != null ? format(task.plannedDate, "p") : undefined
        }
      />
    </ListItem>
  );
}
