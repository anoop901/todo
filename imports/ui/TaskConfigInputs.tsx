import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task } from "../api/Task";
import { TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

export function TaskConfigInputs({
  task,
  setTask,
}: {
  task: Mongo.OptionalId<Task>;
  setTask: (task: Mongo.OptionalId<Task>) => void;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);
  return (
    <>
      <TextField
        variant="outlined"
        inputRef={nameInputRef}
        label="Name"
        value={task.name}
        required
        onChange={(e) => {
          setTask({ ...task, name: e.currentTarget.value });
        }}
        autoComplete="off"
        margin="normal"
      />
      <DateTimePicker
        inputVariant="outlined"
        label="Planned date"
        clearable
        value={task.plannedDate ?? null}
        onChange={(date) => {
          setTask({
            ...task,
            plannedDate: date ?? undefined,
          });
        }}
        margin="normal"
      />
    </>
  );
}
