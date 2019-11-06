import React, { useState, useRef, Fragment } from 'react';
import NavBar from "./NavBar";

import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import { ExpandLess, ExpandMore, Mail as MailIcon, Eco, StarBorder } from "@material-ui/icons";
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
    width: "100%",
    maxWidth: 300
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function MainMenu({ map }) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listItemIndex, setListItemIndex] = useState(0);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const windLayer = useRef();

  const toggleMenu = () => {
    setMenuOpen(isOpen => !isOpen);
  };

  const handleListItemClick = (event, index, onClick = () => {}, subItems) => {
    setListItemIndex(index);
    onClick(event);
    subItems && handleCollapseClick();
  }

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  }

  const menuItems = [
    {
      text: 'Wind',
      IconComponent: Eco,
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
    {
      text: 'Mail',
      IconComponent: MailIcon,
      subItems:
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>,
      onClick: function(event) {
        const { target } = event;
        console.log(target);
      }
    },
    {
      text: 'Spam',
      IconComponent: Eco,
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
        <List component="nav" className={classes.sideList}>
          {menuItems.map(({ text, onClick, IconComponent, subItems }, index) => (
            <Fragment key={index}>
              <ListItem button
                disabled={isLoading}
                key={index}
                selected={listItemIndex === index}
                onClick={event => handleListItemClick(event, index, onClick, subItems)}
              >
                <ListItemIcon><IconComponent /></ListItemIcon>
                <ListItemText primary={text} />
                {subItems && (collapseOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {subItems && <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                {subItems}
              </Collapse>}
            </Fragment>
          ), menuItems)}
        </List>
      </Drawer>
    </>
  );
}