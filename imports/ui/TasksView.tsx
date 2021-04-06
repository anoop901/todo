import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksViewStyles.css";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "TaskDetails" | "NewTask" | null
  >(null);
  return (
    <div className="TasksView">
      <div className="TasksViewMain">
        <Button
          variant="contained"
          color="primary"
          disabled={currentMenu === "NewTask"}
          className="NewTaskButton"
          onClick={() => {
            setCurrentMenu("NewTask");
            setSelectedTaskId(null);
          }}
          startIcon={<AddIcon />}
        >
          New Task
        </Button>
        <TaskList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={(newSelectedTaskId) => {
            setCurrentMenu("TaskDetails");
            setSelectedTaskId(newSelectedTaskId);
          }}
        />
      </div>
      {currentMenu === "NewTask" ? (
        <NewTaskForm
          closeForm={() => {
            setCurrentMenu(null);
            setSelectedTaskId(null);
          }}
        />
      ) : null}
      {currentMenu === "TaskDetails" && selectedTaskId !== null ? (
        <TaskDetailsForm
          task={TaskCollection.findOne({ _id: selectedTaskId })!}
          closeForm={() => {
            setCurrentMenu(null);
            setSelectedTaskId(null);
          }}
        />
      ) : null}
    </div>
  );
}
