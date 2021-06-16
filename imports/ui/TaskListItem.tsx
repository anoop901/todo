import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import classNames from "classnames";
import format from "date-fns/format";
import { Meteor } from "meteor/meteor";
import React from "react";
import { Task } from "../db/Task";
import { useAppDispatch } from "./reducers/hooks";
import { setSelectedTask } from "./reducers/tasksViewSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) => ({
  droppedCheckbox: { visibility: "hidden" },
  droppedText: {
    color: theme.palette.text.disabled,
    textDecorationLine: "line-through",
  },
  completeText: { color: theme.palette.text.disabled },
  listItemSecondaryAction: {
    visibility: "hidden"
  },
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit",
    }
  },
  listItemSecondaryActionSpacer: {
    width: "25px",
    height: "auto",
    display: "inline-block",
  }
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const postponeClicked = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closePostponeMenu = () => {
    setAnchorEl(null);
  };
  const postponeBy = (hoursToPostponeBy: number) => function () {
    if (task.plannedDate === undefined) {
      return;
    }
    const newDate = new Date(task.plannedDate.getTime());
    newDate.setHours(task.plannedDate.getHours() + hoursToPostponeBy);

    Meteor.call("tasks.setPlannedDate", task._id, newDate);
    closePostponeMenu();
  }

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
        className={classNames({
          [classes.completeText]: task.state === "complete",
          [classes.droppedText]: task.state === "dropped",
        })}
        primary={task.name}
        secondary={
          task.plannedDate != null ? format(task.plannedDate, "p") : undefined
        }
      />
      <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
        <IconButton edge="end" aria-label="postpone" onClick={postponeClicked}
          hidden={task.plannedDate === undefined}>
          <UpdateIcon />
        </IconButton>
        <Menu
          id="postpone-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closePostponeMenu}
        >
          <MenuItem onClick={postponeBy(1)}>+1h</MenuItem>
          <MenuItem onClick={postponeBy(24)}>+1d</MenuItem>
          <MenuItem onClick={postponeBy(24 * 7)}>+1w</MenuItem>
        </Menu>
        <div className={classes.listItemSecondaryActionSpacer} />
        <IconButton edge="end" aria-label="delete" onClick={() => {
          Meteor.call("tasks.delete", task._id);
        }}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
