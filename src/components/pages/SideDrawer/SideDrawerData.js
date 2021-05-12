import React from 'react';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';

export const SideDrawerData = [
  {
    title: 'Cases',
    path: '/',
    icon: <BusinessCenterOutlinedIcon />,
  },
  {
    title: 'Judges',
    path: '/judges',
    icon: <GavelOutlinedIcon />,
  },
  {
    title: 'My Cases',
    path: '/my-cases',
    icon: <PublishOutlinedIcon />,
  },
  {
    title: 'Saved Cases',
    path: '/saved-cases',
    icon: <BookmarksOutlinedIcon />,
  },
  {
    title: 'Saved Judges',
    path: '/saved-judges',
    icon: <BookmarkBorderOutlinedIcon />,
  },
];
