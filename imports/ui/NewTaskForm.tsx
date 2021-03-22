import React from "react";
import { TaskCollection } from "../api/Task";
import "./NewTaskForm.css";

export function NewTaskForm({ closeForm }: { closeForm: () => void }) {
  const [name, setName] = React.useState("");

  function reset() {
    setName("");
    closeForm();
  }

  return (
    <form
      className="NewTaskForm"
      onSubmit={(e) => {
        e.preventDefault();
        TaskCollection.insert({ name, state: "incomplete" });
        reset();
      }}
    >
      <h2>Create Task</h2>
      <input
        placeholder="Name"
        className="NewTaskNameInput"
        name="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      <div className="NewTaskFormButtonRow">
        <button
          className="NewTaskDiscardButton"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Discard
        </button>
        <button className="NewTaskSubmit" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
