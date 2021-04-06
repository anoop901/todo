import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import "./TasksViewStyles.css";
import { Button, Hidden } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "TaskDetails" | "NewTask" | null
  >(null);
  return (
    <Grid container wrap="nowrap" direction="row" className="TasksView">
      <Hidden xsDown={currentMenu !== null}>
        <Grid
          item
          xs={12}
          sm={currentMenu === null ? 12 : 6}
          md={currentMenu === null ? 12 : 8}
          className="TasksViewMain"
        >
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
        </Grid>
      </Hidden>
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
    </Grid>
  );
}
