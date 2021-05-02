import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { TasksView } from "./TasksView";
import { TodoAppBar } from "./TodoAppBar";

export function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TodoAppBar />
      <TasksView />
    </MuiPickersUtilsProvider>
  );
}
