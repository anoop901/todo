import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.contrastText,

    borderColor: theme.palette.error.dark,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,

    backgroundColor: theme.palette.error.main,

    padding: "5px",
  },
}));
export function ErrorMessage({
  children: message,
}: {
  children: string;
}): JSX.Element {
  const classes = useStyles();
  return <div className={classes.root}>{message}</div>;
}
