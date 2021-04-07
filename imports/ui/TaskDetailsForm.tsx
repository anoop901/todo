import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { FormEvent, useEffect, useState } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    borderLeft: "2px solid #cccccc",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  },
});

export function TaskDetailsForm({
  task,
  closeForm,
}: {
  task: Task;
  closeForm: () => void;
}) {
  const [taskState, setTaskState] = useState<Mongo.OptionalId<Task>>(task);

  useEffect(() => {
    setTaskState(task);
  }, [task]);

  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      component="form"
      className={classes.root}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        closeForm();
      }}
    >
      <Box display="flex" flexDirection="column">
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
          task={taskState}
          setTask={(newTask) => {
            setTaskState(newTask);
            TaskCollection.update(
              { _id: task._id },
              { ...newTask, _id: task._id }
            );
          }}
        />
        <p>This task is {task.state}.</p>
        <ButtonGroup variant="contained" color="primary" fullWidth>
          {task.state === "pending" ? (
            <Button
              onClick={() => {
                TaskCollection.update(
                  { _id: task._id },
                  { $set: { state: "complete" } }
                );
              }}
              startIcon={<CheckIcon />}
            >
              Mark as Complete
            </Button>
          ) : null}
          {task.state === "complete" ? (
            <Button
              onClick={() => {
                TaskCollection.update(
                  { _id: task._id },
                  { $set: { state: "pending" } }
                );
              }}
              startIcon={<UndoIcon />}
            >
              Unmark as Complete
            </Button>
          ) : null}
          {task.state === "pending" ? (
            <Button
              onClick={() => {
                TaskCollection.update(
                  { _id: task._id },
                  { $set: { state: "dropped" } }
                );
              }}
              startIcon={<ArchiveIcon />}
            >
              Drop
            </Button>
          ) : null}
          {task.state === "dropped" ? (
            <Button
              onClick={() => {
                TaskCollection.update(
                  { _id: task._id },
                  { $set: { state: "pending" } }
                );
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
            TaskCollection.remove({ _id: task._id });
            closeForm();
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
    </Grid>
  );
}
