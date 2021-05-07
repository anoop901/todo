import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React, { FormEvent, useEffect } from "react";
import { Task } from "../db/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Meteor } from "meteor/meteor";

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

export function TaskDetailsForm({
  task,
  closeForm,
}: {
  task: Task;
  closeForm: () => void;
}) {
  const [name, setName] = React.useState("");
  const [plannedDate, setPlannedDate] = React.useState<Date | null>(null);

  useEffect(() => {
    setName(task.name);
    setPlannedDate(task.plannedDate ?? null);
  }, [task]);

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      className={classes.root}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        closeForm();
      }}
    >
      <Box display="flex" alignItems="center">
        <Box flex={1} component="h2">
          Task Details
        </Box>
        <IconButton
          onClick={() => {
            closeForm();
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
          Meteor.call("task.setName", task._id, newName);
        }}
        plannedDate={plannedDate}
        setPlannedDate={(newPlannedDate) => {
          setPlannedDate(newPlannedDate);
          Meteor.call("task.setPlannedDate", task._id, newPlannedDate);
        }}
      />
      <p>This task is {task.state}.</p>
      <ButtonGroup variant="contained" color="primary" orientation="vertical">
        {task.state === "pending" ? (
          <Button
            onClick={() => {
              Meteor.call("task.setState", task._id, "complete");
            }}
            startIcon={<CheckIcon />}
          >
            Mark as Complete
          </Button>
        ) : null}
        {task.state === "complete" ? (
          <Button
            onClick={() => {
              Meteor.call("task.setState", task._id, "pending");
            }}
            startIcon={<UndoIcon />}
          >
            Unmark as Complete
          </Button>
        ) : null}
        {task.state === "pending" ? (
          <Button
            onClick={() => {
              Meteor.call("task.setState", task._id, "dropped");
            }}
            startIcon={<ArchiveIcon />}
          >
            Drop
          </Button>
        ) : null}
        {task.state === "dropped" ? (
          <Button
            onClick={() => {
              Meteor.call("task.setState", task._id, "pending");
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
          Meteor.call("task.delete", task._id);
          closeForm();
        }}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button type="submit" className={classes.invisible}></Button>
    </Box>
  );
}
