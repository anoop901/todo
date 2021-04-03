import {
  faBan,
  faCheck,
  faTrash,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mongo } from "meteor/mongo";
import React, { useEffect, useState } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import "./TaskDetailsFormStyles.css";

export function TaskDetailsForm({
  task,
  closeForm,
}: {
  task: Task;
  closeForm: () => void;
}) {
  const [taskState, setTaskState] = useState<Mongo.OptionalId<Task>>(task);

  useEffect(() => {
    setTaskState(task);
  }, [task]);

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
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      </div>
      <TaskConfigInputs
        task={taskState}
        setTask={(newTask) => {
          setTaskState(newTask);
          TaskCollection.update(
            { _id: task._id },
            { ...newTask, _id: task._id }
          );
        }}
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
            <FontAwesomeIcon icon={faCheck} /> Mark as Complete
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
            <FontAwesomeIcon icon={faBan} /> Drop
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
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </form>
  );
}
