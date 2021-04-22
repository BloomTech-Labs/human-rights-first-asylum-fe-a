import React, { useEffect, useState } from 'react';
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
import RateReviewIcon from '@material-ui/icons/RateReview';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import BuildIcon from '@material-ui/icons/Build';
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
    borderBottom: '1px solid #d9d9d9',
    color: '#215589',
    padding: '1px',
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
    padding: '.2rem',
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  mobileClass: {
    display: 'block',
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
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
    marginLeft: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(window.innerWidth < 769);
  const { logout } = props;

  const role = window.localStorage.getItem('role');

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        const mobile = window.innerWidth < 769;
        if (mobile !== mobile) {
          setMobile(mobile);
        }
      },
      false
    );
    return () => {
      window.removeEventListener('resize');
    };
  }, [mobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
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
          {/* Maps through each item in SideDrawerData creating a nav item in the shape of the ones below the divider */}
          {SideDrawerData.map(item => (
            <Link to={item.path} key={item.title}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} style={textItemStyles} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {/* Checking if user is an admin before rendering the nav item */}
          {role === 'moderator' || 'admin' ? (
            <>
              <Link to="/manage-cases">
                <ListItem button>
                  <ListItemIcon>
                    <RateReviewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Review Cases" style={textItemStyles} />
                </ListItem>
              </Link>
            </>
          ) : null}
          {role === 'admin' ? (
            <>
              <Link to="/admin-tools">
                <ListItem button>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Tools" style={textItemStyles} />
                </ListItem>
              </Link>
            </>
          ) : null}
          {/* Link needs to be wrapped around the whole button to allow the whole button to be used to direct he user */}
          <Link to="/account">
            <ListItem button>
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary="Account" style={textItemStyles} />
            </ListItem>
          </Link>
          <Link to="/support">
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Support" style={textItemStyles} />
            </ListItem>
          </Link>
          <ListItem button onClick={logout} style={textItemStyles}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
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
  color: ' #215589',
};
