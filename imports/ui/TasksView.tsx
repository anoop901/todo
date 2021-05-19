import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../db/Task";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { NewTaskForm } from "./NewTaskForm";
import { TaskList } from "./TaskList";
import {
  InputLabel,
  Box,
  Button,
  Drawer,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router";
import { Meteor } from "meteor/meteor";
import { setNewTaskMenuShown } from "./reducers/tasksViewSlice";
import { useAppDispatch, useAppSelector } from "./reducers/hooks";

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
  filterSelectFormControl: {
    minWidth: 200,
  },
}));

export function TasksView(): JSX.Element {
  const user = useTracker(() => Meteor.user());
  const [filter, setFilter] = useState<"pendingOnly" | "all">("pendingOnly");
  const selectedTaskId = useAppSelector(
    (state) => state.tasksView.selectedTaskId
  );
  const { tasks, selectedTask } = useTracker(() => {
    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return { tasks: [], selectedTask: null };
    }

    const query = filter === "pendingOnly" ? { state: "pending" as const } : {};
    const tasks = TasksCollection.find(query).fetch();

    const selectedTask =
      selectedTaskId == null
        ? null
        : TasksCollection.findOne({ _id: selectedTaskId }) ?? null;
    return { tasks, selectedTask };
  });
  const currentMenu = useAppSelector((state) => state.tasksView.currentMenu);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  if (user === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <>
      <Box display="flex" alignItems="center" className={classes.controlRow}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentMenu === "NewTask"}
          onClick={() => {
            dispatch(setNewTaskMenuShown());
          }}
          startIcon={<AddIcon />}
        >
          New Task
        </Button>
        <Box flex={1} />
        <FormControl
          variant="filled"
          className={classes.filterSelectFormControl}
        >
          <InputLabel id="filter-select-label">Show</InputLabel>
          <Select
            labelId="filter-select-label"
            value={filter}
            onChange={(e) => {
              const newFilter = e.target.value;
              if (newFilter === "pendingOnly" || newFilter === "all") {
                setFilter(newFilter);
              }
            }}
          >
            <MenuItem value="pendingOnly">Pending tasks only</MenuItem>
            <MenuItem value="all">All tasks</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TaskList tasks={tasks} />
      <Drawer
        variant="persistent"
        anchor="right"
        open={currentMenu !== null}
        PaperProps={{ elevation: 16, className: classes.sidebar }}
      >
        {currentMenu === "NewTask" ? <NewTaskForm /> : null}
        {currentMenu === "TaskDetails" && selectedTask != null ? (
          <TaskDetailsForm task={selectedTask} />
        ) : null}
      </Drawer>
    </>
  );
}
