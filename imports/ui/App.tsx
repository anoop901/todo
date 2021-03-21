import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TaskCollection } from "../api/Task";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./AppStyle.css";

export function App() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  return (
    <div className="App">
      <NewTaskForm
        createTask={(name) => {
          TaskCollection.insert({ name, state: "incomplete" });
        }}
      />
      <TaskList tasks={tasks} />
    </div>
  );
}
