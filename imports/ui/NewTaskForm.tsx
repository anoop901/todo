import { Box, Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { FormEvent, useEffect, useRef } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    borderLeft: "2px solid #cccccc",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  },
});

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
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      className={classes.root}
      component="form"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        TaskCollection.insert(task);
        reset();
      }}
    >
      <Box display="flex" flexDirection="column">
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
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </Box>
    </Grid>
  );
}
