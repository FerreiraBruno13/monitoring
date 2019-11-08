import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import OnlineStatus from './OnlineStatus';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({ onClick }) {
  const classes = useStyles();

  const onLogin = () => {
    window.open("https://www.google.com/nonprofits/account/home?hl=pt-BR");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Monitoring
          </Typography>
          <OnlineStatus />
          <Button color="inherit" onClick={onLogin}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}