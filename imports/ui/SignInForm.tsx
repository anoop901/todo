import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formColumn: {
    width: "300px",
    marginTop: theme.spacing(4),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function SignInForm() {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
              return;
            }
            history.push("/tasks");
          });
        }}
      >
        <h2>Sign in</h2>
        <p>
          New user? <Link to="/signup">Sign up.</Link>
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
          Sign in
        </Button>
      </Box>
    </Box>
  );
}