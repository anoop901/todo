import React from "react";
import "./NewTaskFormStyle.css";

export function NewTaskForm({
  createTask,
}: {
  createTask: (name: string) => void;
}) {
  const [name, setName] = React.useState("");

  function reset() {
    setName("");
  }

  return (
    <form
      className="NewTaskForm"
      onSubmit={(e) => {
        e.preventDefault();
        createTask(name);
        reset();
      }}
    >
      <input
        className="NewTaskNameInput"
        name="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      <button className="NewTaskSubmit" type="submit">
        Add Task
      </button>
    </form>
  );
}
