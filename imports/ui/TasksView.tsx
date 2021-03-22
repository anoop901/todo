import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TaskCollection } from "../api/Task";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksViewStyle.css";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  return (
    <div className="TasksView">
      <NewTaskForm
        createTask={(name) => {
          TaskCollection.insert({ name, state: "incomplete" });
        }}
      />
      <TaskList tasks={tasks} />
    </div>
  );
}
