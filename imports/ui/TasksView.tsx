import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksView.css";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [createTaskSidebarOpen, setCreateTaskSidebarOpen] = useState(false);
  return (
    <div className="TasksView">
      <div className="TasksViewMain">
        <div className="CreateTaskButtonRow">
          <button
            className="CreateTaskButton"
            onClick={() => {
              setCreateTaskSidebarOpen(true);
            }}
          >
            Create Task
          </button>
        </div>
        <TaskList tasks={tasks} />
      </div>
      {createTaskSidebarOpen ? (
        <NewTaskForm
          closeForm={() => {
            setCreateTaskSidebarOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
