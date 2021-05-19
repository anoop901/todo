import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FormEvent, useEffect } from "react";
import { TasksCollection } from "../db/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Meteor } from "meteor/meteor";
import { setMenuClosed } from "./reducers/tasksViewSlice";
import { useAppDispatch, useAppSelector } from "./reducers/hooks";
import { useTracker } from "meteor/react-meteor-data";

const useStyles = makeStyles((theme) => ({
  invisible: {
    display: "none",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function TaskDetailsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");
  const [plannedDate, setPlannedDate] = React.useState<Date | null>(null);
  const selectedTaskId = useAppSelector(
    (state) => state.tasksView.selectedTaskId
  );
  const task = useTracker(() => {
    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return null;
    }
    if (selectedTaskId == null) {
      return null;
    }
    const selectedTask =
      TasksCollection.findOne({ _id: selectedTaskId }) ?? null;
    return selectedTask;
  }, [selectedTaskId]);

  useEffect(() => {
    if (task != null) {
      setName(task.name);
      setPlannedDate(task.plannedDate ?? null);
    }
  }, [task]);

  const classes = useStyles();

  if (task == null) {
    return <></>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      className={classes.root}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        dispatch(setMenuClosed());
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h5" component="h2">
          Task Details
        </Typography>
        <Box flex={1}></Box>
        <IconButton
          onClick={() => {
            dispatch(setMenuClosed());
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <TaskConfigInputs
        taskId={task._id}
        name={name}
        setName={(newName) => {
          setName(newName);
          Meteor.call("tasks.setName", task._id, newName);
        }}
        plannedDate={plannedDate}
        setPlannedDate={(newPlannedDate) => {
          setPlannedDate(newPlannedDate);
          Meteor.call("tasks.setPlannedDate", task._id, newPlannedDate);
        }}
      />
      <Typography>This task is {task.state}.</Typography>
      <ButtonGroup variant="contained" color="primary" orientation="vertical">
        {task.state === "pending" ? (
          <Button
            onClick={() => {
              Meteor.call("tasks.setState", task._id, "complete");
            }}
            startIcon={<CheckIcon />}
          >
            Mark as Complete
          </Button>
        ) : null}
        {task.state === "complete" ? (
          <Button
            onClick={() => {
              Meteor.call("tasks.setState", task._id, "pending");
            }}
            startIcon={<UndoIcon />}
          >
            Unmark as Complete
          </Button>
        ) : null}
        {task.state === "pending" ? (
          <Button
            onClick={() => {
              Meteor.call("tasks.setState", task._id, "dropped");
            }}
            startIcon={<ArchiveIcon />}
          >
            Drop
          </Button>
        ) : null}
        {task.state === "dropped" ? (
          <Button
            onClick={() => {
              Meteor.call("tasks.setState", task._id, "pending");
            }}
            startIcon={<UnarchiveIcon />}
          >
            Pick back up
          </Button>
        ) : null}
      </ButtonGroup>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          Meteor.call("tasks.delete", task._id);
          dispatch(setMenuClosed());
        }}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button type="submit" className={classes.invisible}></Button>
    </Box>
  );
}
