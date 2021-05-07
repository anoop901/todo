import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task } from "../db/Task";
import { TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

export function TaskConfigInputs({
  taskId,
  name,
  setName,
  plannedDate,
  setPlannedDate,
}: {
  taskId?: string;
  name: string;
  setName: (name: string) => void;
  plannedDate: Date | null;
  setPlannedDate: (plannedDate: Date | null) => void;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
    nameInputRef.current?.select();
  }, [taskId]);
  return (
    <>
      <TextField
        variant="filled"
        inputRef={nameInputRef}
        label="Name"
        value={name}
        required
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      <DateTimePicker
        inputVariant="filled"
        label="Planned date"
        clearable
        value={plannedDate}
        onChange={(newPlannedDate) => {
          setPlannedDate(newPlannedDate);
        }}
      />
    </>
  );
}
