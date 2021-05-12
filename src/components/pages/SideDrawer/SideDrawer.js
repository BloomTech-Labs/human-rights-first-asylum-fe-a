import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import BuildIcon from '@material-ui/icons/Build';
import { Link } from 'react-router-dom';
import { SideDrawerData } from './SideDrawerData';

const drawerWidth = 215;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 65px)',
    top: 87,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
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

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            {/* {open === false ? <ArrowRight /> : <ArrowLeft />} */}
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
          {role === 'moderator' || role === 'admin' ? (
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
    </div>
  );
}

const textItemStyles = {
  color: ' #215589',
};
