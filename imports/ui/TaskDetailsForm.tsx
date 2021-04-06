import { Button, IconButton } from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { useEffect, useState } from "react";
import { Task, TaskCollection } from "../api/Task";
import { TaskConfigInputs } from "./TaskConfigInputs";
import "./TaskDetailsFormStyles.css";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

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
        <IconButton
          className="TaskDetailsFormCloseButton"
          onClick={() => {
            closeForm();
          }}
        >
          <CloseIcon />
        </IconButton>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "complete" } }
              );
            }}
            startIcon={<CheckIcon />}
          >
            Mark as Complete
          </Button>
        ) : null}
        {task.state === "complete" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "pending" } }
              );
            }}
            startIcon={<UndoIcon />}
          >
            Unmark as Complete
          </Button>
        ) : null}
        {task.state === "pending" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "dropped" } }
              );
            }}
            startIcon={<ArchiveIcon />}
          >
            Drop
          </Button>
        ) : null}
        {task.state === "dropped" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              TaskCollection.update(
                { _id: task._id },
                { $set: { state: "pending" } }
              );
            }}
            startIcon={<UnarchiveIcon />}
          >
            Pick back up
          </Button>
        ) : null}
      </div>
      <div className="TaskDetailsFormActionButtonRow">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            TaskCollection.remove({ _id: task._id });
            closeForm();
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}
