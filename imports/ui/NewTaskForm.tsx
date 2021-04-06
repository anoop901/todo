import { Button, IconButton } from "@material-ui/core";
import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task, TaskCollection } from "../api/Task";
import "./NewTaskFormStyles.css";
import { TaskConfigInputs } from "./TaskConfigInputs";
import CloseIcon from "@material-ui/icons/Close";

export function NewTaskForm({ closeForm }: { closeForm: () => void }) {
  const initialTask: Mongo.OptionalId<Task> = {
    name: "",
    state: "pending",
  };
  const [task, setTask] = React.useState(initialTask);

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  function reset() {
    setTask(initialTask);
    closeForm();
  }

  return (
    <form
      className="NewTaskForm"
      onSubmit={(e) => {
        e.preventDefault();
        TaskCollection.insert(task);
        reset();
      }}
    >
      <div className="NewTaskFormHeader">
        <h2>New Task</h2>
        <IconButton
          className="NewTaskFormDiscardButton"
          onClick={() => {
            reset();
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <TaskConfigInputs task={task} setTask={setTask} />
      <div className="NewTaskFormActionButtonRow">
        <Button
          variant="contained"
          color="primary"
          className="NewTaskSubmit"
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
