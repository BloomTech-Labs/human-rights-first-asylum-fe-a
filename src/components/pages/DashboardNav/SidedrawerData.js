import React from 'react';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Publish';
import HelpIcon from '@material-ui/icons/Help';

export const SidedrawerData = [
  {
    title: 'Account',
    path: '/',
    icon: <AccountIcon />,
    className: 'drawer-text',
  },
  {
    title: 'Saved Cases',
    path: '/',
    icon: <BookmarksIcon />,
    className: 'drawer-text',
  },
  {
    title: 'Upload a Case',
    path: '/',
    icon: <PublishIcon />,
    className: 'drawer-text',
  },
  {
    title: 'Support',
    path: '/',
    icon: <HelpIcon />,
    className: 'drawer-text',
  },
  {
    title: 'Logout',
    path: '/',
    icon: <CloseIcon />,
    className: 'drawer-text',
  },
];
