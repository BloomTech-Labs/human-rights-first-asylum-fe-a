import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import HRFlogo from './HRFlogo.png';
/* import BookmarkPanel from '../Bookmarks/BookmarksQuickview'; */
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Publish';
import NoteIcon from '@material-ui/icons/Receipt';
import GavelIcon from '@material-ui/icons/Gavel';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import { SideDrawerData } from './SideDrawerData';

const drawerWidth = 225;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'white',
    color: 'navy',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  favorites: {
    overflowY: 'scroll',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const itemList = SideDrawerData;
  const {
    logout,
    userInfo,
    updateCases,
    savedCases,
    savedJudges,
    deleteBookmark,
    deleteSavedJudge,
  } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // if (!savedCases ) {
  //   // surely there is a better way to do this?? idk
  //   // two weeks later and I have no idea what purpose this served
  //   return <div></div>;
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            redundant
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            <a href="/">
              <img src={HRFlogo} alt=" HRF logo" className="hrflogo" />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" style={textItemStyles} />
            </ListItem>
          </Link>
          <Link to="/upload-case">
            <ListItem button>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Case" style={textItemStyles} />
            </ListItem>
          </Link>
          <Link to="/saved-cases">
            <ListItem button>
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary="Saved Cases" style={textItemStyles} />
            </ListItem>
          </Link>
          <ListItem>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Judges" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {itemList.map((item, index) => (
            <ListItem button key={item.title}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}

          <ListItem button onClick={logout()}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        {/* <List>
          
          {savedJudges.map((judge, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={judge.judge_name} />
              <IconButton onClick={() => deleteSavedJudge(judge.judge_name)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

const textItemStyles = {
  color: 'black',
};
