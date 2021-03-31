import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task } from "../api/Task";
import "./TaskConfigInputs.css";

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
        className="TaskConfigNameInput"
        name="name"
        type="text"
        value={task.name}
        required
        onChange={(e) => {
          setTask({ ...task, name: e.currentTarget.value });
        }}
        autoComplete="off"
      />
    </>
  );
}
