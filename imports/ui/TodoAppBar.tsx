import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export function TodoAppBar(): JSX.Element {
  const user = useTracker(() => Meteor.user());
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1">
          Anoop&apos;s Todo
        </Typography>
        <Box flex={1} />
        {user != null ? (
          <>
            <AccountCircleIcon />
            <Typography>{user.username}</Typography>
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
