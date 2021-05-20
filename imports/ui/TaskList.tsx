import { List, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Task, TasksCollection } from "../db/Task";
import { TaskListItem } from "./TaskListItem";
import { format, isEqual, startOfDay } from "date-fns";
import sortedIndex from "lodash/sortedIndex";
import { useAppSelector } from "./reducers/hooks";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const useStyles = makeStyles({
  empty: {
    textAlign: "center",
    paddingTop: "30px",
    fontSize: "small",
    color: "#888",
    fontStyle: "italic",
  },
});

interface ScheduledTaskGroup {
  day: Date;
  tasks: Task[]; // all of these tasks should have plannedDate
}

interface UnscheduledTaskGroup {
  tasks: Task[]; // none of these tasks should have plannedDate
}

type TaskGroup = ScheduledTaskGroup | UnscheduledTaskGroup;

function groupScheduledTasks(scheduledTasks: Task[]): ScheduledTaskGroup[] {
  const scheduledTaskGroups = [] as ScheduledTaskGroup[];

  for (const scheduledTask of scheduledTasks) {
    const plannedDate = scheduledTask.plannedDate;
    if (plannedDate == null) {
      throw new Error(
        "called groupScheduledTasks with a list including an unscheduled task"
      );
    }
    const plannedDay = startOfDay(plannedDate);
    const index = sortedIndex(
      scheduledTaskGroups.map((stg) => stg.day),
      plannedDay
    );
    // Check if there is already a task group for this task's planned day
    if (
      index < scheduledTaskGroups.length &&
      isEqual(scheduledTaskGroups[index].day, plannedDay)
    ) {
      // If there is already a task group, insert this task to it (while keeping it sorted)
      const tasksInGroup = scheduledTaskGroups[index].tasks;
      const taskIndex = sortedIndex(
        tasksInGroup.map((task) => task.plannedDate),
        plannedDate
      );
      tasksInGroup.splice(taskIndex, 0, scheduledTask);
    } else {
      // If there isn't already a task group, create one starting with this task
      scheduledTaskGroups.splice(index, 0, {
        day: plannedDay,
        tasks: [scheduledTask],
      });
    }
  }

  return scheduledTaskGroups;
}

function groupTasks(tasks: Task[]): TaskGroup[] {
  const scheduledTasks = tasks.filter((task) => task.plannedDate != null);
  const scheduledTaskGroups = groupScheduledTasks(scheduledTasks);

  const unscheduledTasks = tasks.filter((task) => task.plannedDate == null);

  if (unscheduledTasks.length === 0) {
    return scheduledTaskGroups;
  }

  const unscheduledIndex = sortedIndex(
    scheduledTaskGroups.map((stg) => stg.day),
    startOfDay(new Date())
  );
  const taskGroups: TaskGroup[] = [...scheduledTaskGroups];
  taskGroups.splice(unscheduledIndex, 0, { tasks: unscheduledTasks });

  return taskGroups;
}

export function TaskList({
  filter,
}: {
  filter: "pendingOnly" | "all";
}): JSX.Element {
  const classes = useStyles();
  const selectedTaskId = useAppSelector(
    (state) => state.tasksView.selectedTaskId
  );
  const tasks = useTracker(() => {
    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return [];
    }
    const query = filter === "pendingOnly" ? { state: "pending" as const } : {};
    return TasksCollection.find(query).fetch();
  });
  const groupedTasks = groupTasks(tasks);
  return tasks.length === 0 ? (
    <p className={classes.empty}>No tasks yet.</p>
  ) : (
    <>
      {groupedTasks.map((taskGroup, key) => (
        <div key={key}>
          <Typography variant="overline">
            {"day" in taskGroup
              ? format(new Date(taskGroup.day), "ccc, PP")
              : "Unscheduled"}
          </Typography>
          <List>
            {taskGroup.tasks.map((task) => (
              <TaskListItem
                selected={selectedTaskId == task._id}
                key={task._id}
                task={task}
              />
            ))}
          </List>
        </div>
      ))}
    </>
  );
}
