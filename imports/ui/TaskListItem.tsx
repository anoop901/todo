import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import { Meteor } from "meteor/meteor";
import React from "react";
import { Task } from "../db/Task";

const useStyles = makeStyles({
  droppedCheckbox: { visibility: "hidden" },
  droppedText: { color: "#888888", textDecorationLine: "line-through" },
  completeText: { color: "#888888" },
});

export function TaskListItem({
  task,
  onClick,
  selected,
}: {
  task: Task;
  onClick?: () => void;
  selected: boolean;
}) {
  const classes = useStyles();
  return (
    <ListItem button selected={selected} onClick={onClick}>
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
      >
        <Box fontWeight={task.state === "pending" ? "bold" : "normal"}>
          {task.name}
        </Box>
      </ListItemText>
    </ListItem>
  );
}
