import React from 'react';
import AccountIcon from '@material-ui/icons/AccountCircle';
import PublishIcon from '@material-ui/icons/Publish';
import HelpIcon from '@material-ui/icons/Help';

export const SideDrawerData = [
  {
    title: 'Account',
    path: '/',
    icon: <AccountIcon />,
  },
  {
    title: 'Upload Case',
    path: '/',
    icon: <PublishIcon />,
  },
  {
    title: 'Support',
    path: '/',
    icon: <HelpIcon />,
  },
];
