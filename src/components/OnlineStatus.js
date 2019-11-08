import React, { useState } from "react";
import { Wifi, WifiOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  online: {
    color: "green"
  },
  offline: {
    color: "red"
  }
}));

export default function OnlineStatus() {
  const classes = useStyles();
  const [online, setOnline] = useState(navigator.onLine);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  return online ? <Wifi className={classes.online} /> : <WifiOff className={classes.offline} />
}