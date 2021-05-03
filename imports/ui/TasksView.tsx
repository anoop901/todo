import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import { Box, Button, Drawer } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router";
import { Meteor } from "meteor/meteor";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: `${theme.breakpoints.values.md * 0.5}px`,
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  controlRow: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "TaskDetails" | "NewTask" | null
  >(null);
  const classes = useStyles();
  const user = useTracker(() => Meteor.user());
  return user === null ? (
    <Redirect to="/signin" />
  ) : (
    <>
      <Box display="flex" alignItems="center" className={classes.controlRow}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentMenu === "NewTask"}
          onClick={() => {
            setCurrentMenu("NewTask");
            setSelectedTaskId(null);
          }}
          startIcon={<AddIcon />}
        >
          New Task
        </Button>
        <Box flex={1} />
      </Box>
      <TaskList
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={(newSelectedTaskId) => {
          setCurrentMenu("TaskDetails");
          setSelectedTaskId(newSelectedTaskId);
        }}
      />
      <Drawer
        variant="persistent"
        anchor="right"
        open={currentMenu !== null}
        PaperProps={{ elevation: 16, className: classes.sidebar }}
      >
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
      </Drawer>
    </>
  );
}
