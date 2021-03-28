import React, { useEffect, useRef } from "react";
import { TaskCollection } from "../api/Task";
import "./NewTaskForm.css";

export function NewTaskForm({ closeForm }: { closeForm: () => void }) {
  const [name, setName] = React.useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

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
      <div className="NewTaskFormHeader">
        <h2>New Task</h2>
        <button
          className="NewTaskFormDiscardButton"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Discard
        </button>
      </div>
      <input
        ref={nameInputRef}
        placeholder="Name"
        className="NewTaskNameInput"
        name="name"
        type="text"
        value={name}
        required
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      <div className="NewTaskFormActionButtonRow">
        <button className="NewTaskSubmit" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
