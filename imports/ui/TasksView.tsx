import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksView.css";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [newTaskSidebarOpen, setNewTaskSidebarOpen] = useState(false);
  return (
    <div className="TasksView">
      <div className="TasksViewMain">
        <div className="NewTaskButtonRow">
          <button
            disabled={newTaskSidebarOpen}
            className="NewTaskButton"
            onClick={() => {
              setNewTaskSidebarOpen(true);
            }}
          >
            New Task
          </button>
        </div>
        <TaskList tasks={tasks} />
      </div>
      {newTaskSidebarOpen ? (
        <NewTaskForm
          closeForm={() => {
            setNewTaskSidebarOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
