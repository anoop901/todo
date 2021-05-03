import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";

const useStyles = makeStyles((theme) => ({
  formColumn: {
    width: "300px",
    marginTop: theme.spacing(4),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function SignUpForm() {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();
  return (
    <Box display="flex" justifyContent="space-around">
      <Box
        display="flex"
        flexDirection="column"
        className={classes.formColumn}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          Accounts.createUser({ username, password }, (error) => {
            if (error) {
              setErrorMessage(error.message);
              return;
            }
            Meteor.loginWithPassword(username, password, (error) => {
              if (error) {
                setErrorMessage(error.message);
                return;
              }
              history.push("/tasks");
            });
          });
        }}
      >
        <h2>Sign up</h2>
        {errorMessage !== null && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <p>
          Already have an account? <Link to="/signin">Sign in.</Link>
        </p>
        <TextField
          variant="filled"
          label="Username"
          value={username}
          required
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
        <TextField
          type="password"
          variant="filled"
          label="Password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
