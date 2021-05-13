import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { SignInForm } from "./SignInForm";
import { TasksView } from "./TasksView";
import { TodoAppBar } from "./TodoAppBar";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { SignUpForm } from "./SignUpForm";

export function App(): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TodoAppBar />
      <Router>
        <Switch>
          <Route path="/signin">
            <SignInForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/tasks">
            <TasksView />
          </Route>
          <Route path="/">
            <Redirect to="/tasks" />
          </Route>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
