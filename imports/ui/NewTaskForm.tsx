import React from "react";

export function NewTaskForm({
  createTask,
}: {
  createTask: (name: string) => void;
}) {
  const [name, setName] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTask(name);
        setName("");
      }}
    >
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
