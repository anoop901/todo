import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { FormEvent, useEffect, useRef } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  margins: {
    margin: theme.spacing(1),
  },
}));

export function NewTaskForm({ closeForm }: { closeForm: () => void }) {
  const initialTask: Mongo.OptionalId<Task> = {
    name: "",
    state: "pending",
  };
  const [task, setTask] = React.useState(initialTask);

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const classes = useStyles();

  function reset() {
    setTask(initialTask);
    closeForm();
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        TaskCollection.insert(task);
        reset();
      }}
    >
      <Box display="flex" alignItems="center">
        <Box flex={1} component="h2">
          New Task
        </Box>
        <IconButton
          onClick={() => {
            reset();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <TaskConfigInputs task={task} setTask={setTask} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.margins}
      >
        Create
      </Button>
    </Box>
  );
}
