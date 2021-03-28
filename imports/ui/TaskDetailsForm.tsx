import React, { useEffect, useRef, useState } from "react";
import { Task, TaskCollection } from "../api/Task";
import "./TaskDetailsForm.css";

export function TaskDetailsForm({
  task,
  closeForm,
}: {
  task: Task;
  closeForm: () => void;
}) {
  const [name, setName] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setName(task.name);
  }, [task.name]);

  return (
    <form className="TaskDetailsForm">
      <h2>Task Details</h2>
      <input
        ref={nameInputRef}
        placeholder="Name"
        className="EditTaskNameInput"
        name="name"
        type="text"
        value={name}
        required
        onChange={(e) => {
          const newTaskName = e.currentTarget.value;
          setName(newTaskName);
          TaskCollection.update(
            { _id: task._id },
            { $set: { name: newTaskName } }
          );
        }}
        autoComplete="off"
      />
      <div className="TaskDetailsFormButtonRow">
        <button
          className="TaskDetailsCloseButton"
          type="button"
          onClick={() => {
            closeForm();
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
}
