import React, { useState } from 'react';
import { Button, Menu, MenuItem, Fade, CssBaseline, TextField, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { MoveToInbox as InboxIcon, Mail as MailIcon } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: "column",
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    border: 100,
  },
  sideList: {
    width: 250
  }
}));

export default function MainMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonText, setButtonText] = useState("Type something to change text")
  const [menuOpen, setMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleInput = ({ target }) => {
    const { value } = target;
    setButtonText(value ? value : "Type something to change text")
  };

  const toggleMenu = () => {
    setMenuOpen(menuOpen => !menuOpen);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    "Profile",
    "My account",
    "Logout"
  ];

  return (
    <div>
      <form className={classes.container}>
        <CssBaseline />
        <Button variant="contained" color="primary" onClick={toggleMenu}>
          {buttonText}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open with fade transition
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {
            menuItems.map((item, index) => {
              return <MenuItem key={index} onClick={handleClose}>{item}</MenuItem>
            })
          }
        </Menu>
        <div>
          <TextField
            label="Helper text"
            defaultValue="Default Value"
            onInput={handleInput}
            className={classes.textField}
            placeholder="Digite aqui"
            variant="outlined"
          />
        </div>
      </form>
      <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
        <div className={classes.sideList}>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}