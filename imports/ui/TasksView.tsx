import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TaskCollection } from "../api/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import { Button, Hidden } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  main: {
    overflow: "auto",
  },
  sidebar: {
    borderLeft: "2px solid #cccccc",
    backgroundColor: "#eeeeee",
    overflow: "auto",
  },
  margins: {
    margin: theme.spacing(1),
  },
}));

export function TasksView() {
  const tasks = useTracker(() => TaskCollection.find().fetch());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "TaskDetails" | "NewTask" | null
  >(null);
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" direction="row" className={classes.root}>
      <Hidden xsDown={currentMenu !== null}>
        <Grid
          item
          xs={12}
          sm={currentMenu === null ? 12 : 6}
          md={currentMenu === null ? 12 : 8}
          className={classes.main}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={currentMenu === "NewTask"}
            onClick={() => {
              setCurrentMenu("NewTask");
              setSelectedTaskId(null);
            }}
            startIcon={<AddIcon />}
            className={classes.margins}
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
      <Hidden xsUp={currentMenu === null}>
        <Grid item xs={12} sm={6} md={4} className={classes.sidebar}>
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
      </Hidden>
    </Grid>
  );
}
