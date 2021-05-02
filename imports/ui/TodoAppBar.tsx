import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import React from "react";

export function TodoAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <h1>To-do app</h1>
        <Box flex={1} />
        <Button variant="text" color="inherit">
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
