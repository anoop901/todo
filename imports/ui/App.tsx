import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { TasksView } from "./TasksView";

export function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TasksView />
    </MuiPickersUtilsProvider>
  );
}
