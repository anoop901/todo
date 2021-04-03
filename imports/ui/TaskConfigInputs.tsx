import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task } from "../api/Task";
import "./TaskConfigInputsStyles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      <input
        ref={nameInputRef}
        placeholder="Name"
        className="TaskConfigTextInput"
        name="name"
        type="text"
        value={task.name}
        required
        onChange={(e) => {
          setTask({ ...task, name: e.currentTarget.value });
        }}
        autoComplete="off"
      />
      <div>
        <DatePicker
          className="TaskConfigTextInput"
          selected={task.plannedDate}
          onChange={(date) =>
            setTask({
              ...task,
              plannedDate: (date as Date | null) ?? undefined,
            })
          }
          showTimeSelect
          dateFormat="Pp"
          isClearable
          placeholderText="Planned date"
        />
      </div>
    </>
  );
}
