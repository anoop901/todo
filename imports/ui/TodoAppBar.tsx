import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";

export function TodoAppBar() {
  const user = useTracker(() => Meteor.user());
  return (
    <AppBar position="static">
      <Toolbar>
        <h1>To-do app</h1>
        <Box flex={1} />
        {user !== null ? (
          <>
            <span>Welcome, {user?.username}!</span>
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                Meteor.logout();
              }}
            >
              Sign out
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
