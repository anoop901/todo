import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TaskCollection } from "../api/Task";
import { TaskList } from "./TaskList";
import "./TasksView.css";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  return (
    <div className="TasksView">
      <div className="CreateTaskButtonRow">
        <button className="CreateTaskButton">Create Task</button>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}
