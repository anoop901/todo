import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FormEvent, useEffect, useRef } from "react";
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

export function NewTaskForm({
  closeForm,
}: {
  closeForm: () => void;
}): JSX.Element {
  const user = useTracker(() => Meteor.user());
  if (user === null) {
    return <></>;
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
        Meteor.call("tasks.new", name, plannedDate);
        reset();
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h5" component="h2">
          New Task
        </Typography>
        <Box flex={1}></Box>
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
