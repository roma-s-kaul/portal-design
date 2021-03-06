import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/* This file contains code for the Navigation bar */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#373737"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold"
  },
  titleBar: {
    backgroundColor: "#312f2f",
    boxShadow:  "8px 8px 31px #141313, -8px -8px 31px #4e4b4b"
  },
  loginButton: {
    fontWeight: "bold"
  }
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className = {classes.titleBar}>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BOKN
          </Typography>
          <Typography variant="h6" className={classes.title}>
            ENTREPRENEURSHIP PORTAL
          </Typography>
          <Button className={classes.loginButton} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}



