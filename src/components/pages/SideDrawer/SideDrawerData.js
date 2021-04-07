import React from 'react';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Publish';
import GavelIcon from '@material-ui/icons/Gavel';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BookmarkIcon from '@material-ui/icons/Bookmark';

export const SideDrawerData = [
  {
    title: 'Cases',
    path: '/',
    icon: <BusinessCenterIcon />,
  },
  {
    title: 'Judges',
    path: '/judges',
    icon: <GavelIcon />,
  },
  {
    title: 'Upload Case',
    path: '/upload-case',
    icon: <PublishIcon />,
  },
  {
    title: 'Saved Cases',
    path: '/saved-cases',
    icon: <BookmarksIcon />,
  },
  {
    title: 'Saved Judges',
    path: '/saved-judges',
    icon: <BookmarkIcon />,
  },
];
