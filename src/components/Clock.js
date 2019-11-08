import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  clock: {
    paddingRight: 10,
    paddingLeft: 10
  }
})

export default function Clock() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearTimeout(timeout);
    }
  });

  return (
    <Typography className={classes.clock}>{date.toLocaleString()}</Typography>
  )
}