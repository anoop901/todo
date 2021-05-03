import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { FormEvent, useEffect, useRef } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CloseIcon from "@material-ui/icons/Close";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function NewTaskForm({ closeForm }: { closeForm: () => void }) {
  const user = useTracker(() => Meteor.user());
  if (user === null) {
    return null;
  }

  const [name, setName] = React.useState("");
  const [plannedDate, setPlannedDate] = React.useState<Date | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const classes = useStyles();

  function reset() {
    setName("");
    setPlannedDate(null);
    closeForm();
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      className={classes.root}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        Meteor.call("task.new", name, plannedDate);
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
      <TaskConfigInputs
        name={name}
        setName={setName}
        plannedDate={plannedDate}
        setPlannedDate={setPlannedDate}
      />
      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </Box>
  );
}
