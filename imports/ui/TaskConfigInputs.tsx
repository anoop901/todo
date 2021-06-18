import React, { useEffect, useRef } from "react";
import { Box, TextField } from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setYear,
} from "date-fns";
import { PostponeTaskButton } from "./PostponeTaskButton";

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
}): JSX.Element {
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
      <Box display="flex">
        <DatePicker
          style={{ flex: 3 }}
          inputVariant="filled"
          label="Planned date"
          clearable
          value={plannedDate}
          format="ccc, PP"
          onChange={(newPlannedDateWithoutTime) => {
            if (plannedDate == null) {
              setPlannedDate(newPlannedDateWithoutTime);
              return;
            }
            if (newPlannedDateWithoutTime == null) {
              setPlannedDate(null);
              return;
            }
            const newPlannedDate = setYear(
              setMonth(
                setDate(plannedDate, getDate(newPlannedDateWithoutTime)),
                getMonth(newPlannedDateWithoutTime)
              ),
              getYear(newPlannedDateWithoutTime)
            );
            setPlannedDate(newPlannedDate);
          }}
        />
        <TimePicker
          style={{ flex: 2 }}
          inputVariant="filled"
          label="Planned time"
          value={plannedDate}
          format="p"
          clearable
          disabled={plannedDate == null}
          onChange={(newPlannedTime) => {
            if (plannedDate == null) {
              return;
            }
            if (newPlannedTime == null) {
              setPlannedDate(null);
              return;
            }
            const newPlannedDate = setHours(
              setMinutes(plannedDate, getMinutes(newPlannedTime)),
              getHours(newPlannedTime)
            );
            setPlannedDate(newPlannedDate);
          }}
        />
        {taskId !== undefined && plannedDate !== null ? <PostponeTaskButton taskId={taskId} /> : null}
      </Box>
    </>
  );
}
