import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
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
import DeleteIcon from "@material-ui/icons/Delete";
import { PostponeTaskButton } from "./PostponeTaskButton";

const useStyles = makeStyles((theme) => ({
  droppedCheckbox: { visibility: "hidden" },
  text: {
    wordWrap: "break-word",
    paddingRight: "100px",
  },
  droppedText: {
    color: theme.palette.text.disabled,
    textDecorationLine: "line-through",
  },
  completeText: { color: theme.palette.text.disabled },
  actionButtons: {
    visibility: "hidden"
  },
  listItem: {
    "&:hover $actionButtons": {
      visibility: "inherit",
    }
  },
  listItemSecondaryActionSpacer: {
    width: "25px",
    height: "auto",
    display: "inline-block",
  }
}));

function DeleteTaskButton({ task }: { task: Task }): JSX.Element {
  return (<IconButton edge="end" aria-label="delete" onClick={() => {
    Meteor.call("tasks.delete", task._id);
  }}>
    <DeleteIcon />
  </IconButton>);
}

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
      classes={{
        container: classes.listItem
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
        className={classNames(
          classes.text,
          {
            [classes.completeText]: task.state === "complete",
            [classes.droppedText]: task.state === "dropped",
          })}
        primary={task.name}
        secondary={
          task.plannedDate != null ? format(task.plannedDate, "p") : undefined
        }
      />
      <ListItemSecondaryAction className={classes.actionButtons}>
        {task.plannedDate ? <span>
          <PostponeTaskButton taskId={task._id} />
          <div className={classes.listItemSecondaryActionSpacer} />
        </span> : null}
        <DeleteTaskButton task={task} />
        <div className={classes.listItemSecondaryActionSpacer} />
      </ListItemSecondaryAction>
    </ListItem >
  );
}
