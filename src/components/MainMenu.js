import React, { useState, useRef } from 'react';
import NavBar from "./NavBar";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import { Delete, Mail as MailIcon, Eco } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { VelocityLayer } from "leafwind";

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

export default function MainMenu({ map, setMap }) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const windLayer = useRef();

  const toggleMenu = () => {
    setMenuOpen(isOpen => !isOpen);
  };

  const menuItems = [
    {
      text: 'Wind',
      onClick: function(event) {
        setLoading(true);

        // this.selected = !this.selected;
        const { current } = windLayer;

        if (current) {
          setLoading(false);

          if (map.hasLayer(current)) {
            return void current.removeFrom(map);
          }

          return void current.addTo(map);
        }

        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0].replace(/-/g, "");
        const formattedHour = `0${now.getUTCHours()}`.slice(-2); // Ensures double digit.

        fetch(`https://b2cforecast.climatempo.com.br/datas/windy/global/${formattedDate}/${formattedHour}_10m.json`)
          .then(response => response.json())
          .then(data => {
            const { current } = windLayer;

            if (current) current.removeFrom(map);

            windLayer.current = new VelocityLayer({
              data: data,
              displayOptions: {
                speedUnit: 'km/h'
              },
              lineWidth: 2,
              maxVelocity: 100,
            }).addTo(map);

            setLoading(false);
        });
      }
      },
      IconComponent: Eco
    },
    {
      text: 'Mail',
      onClick: function(event) {
        const { target } = event;
        console.log(target);
      },
      IconComponent: MailIcon
    },
    {
      text: 'Spam',
      onClick: function(event) {
        const { target } = event;
        console.log(target);
      },
      IconComponent: Delete
    }
  ];

  return (
    <>
      <NavBar onClick={toggleMenu} />
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <div className={classes.sideList}>
          <List>
            {menuItems.map(({ text, onClick, IconComponent }, index) => (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon><IconComponent /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}