import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mongo } from "meteor/mongo";
import React, { useEffect, useRef } from "react";
import { Task, TaskCollection } from "../api/Task";
import "./NewTaskFormStyles.css";
import { TaskConfigInputs } from "./TaskConfigInputs";

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
        <button
          className="NewTaskFormDiscardButton"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      </div>
      <TaskConfigInputs task={task} setTask={setTask} />
      <div className="NewTaskFormActionButtonRow">
        <button className="NewTaskSubmit" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
