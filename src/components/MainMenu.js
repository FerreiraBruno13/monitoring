import React, { useState } from 'react';
import NavBar from "./NavBar";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import { MoveToInbox as InboxIcon, Mail as MailIcon } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: "column",
    flexWrap: 'wrap',
    width: "fit-content"
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

export default function MainMenu(props) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(isOpen => !isOpen);
  };

  const menuItems = [
    {
      text: 'All mail',
      onClick: function(event) {
        window.open("https://mail.google.com");
      }
    },
    {
      text: 'Trash',
      onClick: function(event) {
        const { target } = event;
        console.log(target);
      }
    },
    {
      text: 'Spam',
      onClick: function(event) {
        const { target } = event;
        console.log(target);
      }
    }
  ];

  return (
    <>
      <NavBar onClick={toggleMenu} />
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <div className={classes.sideList}>
          <List>
            {menuItems.map(({ text, onClick }, index) => (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}