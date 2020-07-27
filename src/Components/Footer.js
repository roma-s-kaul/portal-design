import React from 'react'
import './Footer.css'
//import 'bootstrap-css-only/css/bootstrap.min.css'; 
//import 'mdbreact/dist/css/mdb.css';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "space-evenly",
    background: "#373737",
    color: "white"
  },
  temp: {
    color: "white"
  }
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.temp} label="Watch video tutorials" icon={<VisibilityIcon />} />
      <BottomNavigationAction className={classes.temp} label="Additional Entrepreneurship Links" icon={<QueuePlayNextIcon />} />
      <BottomNavigationAction className={classes.temp} label="Business Open Knowledge Network Home" icon={<HomeIcon />} />
      <BottomNavigationAction className={classes.temp} label="Resources For Women Entrepreneurs" icon={<FolderIcon />} />
      <BottomNavigationAction className={classes.temp} label="Who are we and our mission" icon={<GroupIcon />} />
    </BottomNavigation>
  );
}

export default Footer;