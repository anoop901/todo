import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TaskCollection } from "../api/Task";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";

export function App() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  return (
    <>
      <NewTaskForm
        createTask={(name) => {
          TaskCollection.insert({ name });
        }}
      />
      <TaskList tasks={tasks} />
    </>
  );
}
