import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { SignInForm } from "./SignInForm";
import { TasksView } from "./TasksView";
import { TodoAppBar } from "./TodoAppBar";

export function App() {
  const user = useTracker(() => Meteor.user());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TodoAppBar />
      {user !== null ? <TasksView /> : <SignInForm />}
    </MuiPickersUtilsProvider>
  );
}
