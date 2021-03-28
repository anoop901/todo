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
    <form
      className="TaskDetailsForm"
      onSubmit={(e) => {
        e.preventDefault();
        closeForm();
      }}
    >
      <div className="TaskDetailsFormHeader">
        <h2>Task Details</h2>
        <button
          className="TaskDetailsFormCloseButton"
          type="button"
          onClick={() => {
            closeForm();
          }}
        >
          Close
        </button>
      </div>
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
      <p>This task is {task.state}.</p>
      <div className="TaskDetailsFormActionButtonRow">
        {task.state === "pending" ? (
          <button
            type="button"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "complete" } }
              );
            }}
          >
            Mark as Complete
          </button>
        ) : null}
        {task.state === "complete" ? (
          <button
            type="button"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "pending" } }
              );
            }}
          >
            Unmark as Complete
          </button>
        ) : null}
        {task.state === "pending" ? (
          <button
            type="button"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "dropped" } }
              );
            }}
          >
            Drop
          </button>
        ) : null}
        {task.state === "dropped" ? (
          <button
            type="button"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "pending" } }
              );
            }}
          >
            Pick back up
          </button>
        ) : null}
      </div>
      <div className="TaskDetailsFormActionButtonRow">
        <button
          type="button"
          onClick={() => {
            TaskCollection.remove({ _id: task._id });
            closeForm();
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
