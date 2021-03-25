import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../context/UserContext';
import RenderHomePage from './RenderHomePage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: '999',
    height: '2em',
    width: '2em',
    overflow: 'show',
    margin: 'auto',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    transform: 'scale(2)',
  },
}));

function HomeContainer() {
  const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoOktaAuth] = useMemo(() => [oktaAuth], []);

  useEffect(() => {
    let isSubscribed = true;

    memoOktaAuth
      .getUser()
      .then(info => {
        // if user is authenticated we can use the oktaAuth to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoOktaAuth]);

  const classes = useStyles();

  // JWT access token can be accessed from the authState object if needed
  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
      {authState.isAuthenticated && userInfo && (
        <UserContext.Provider value={{ oktaAuth, authState, userInfo }}>
          <RenderHomePage />
        </UserContext.Provider>
      )}
    </>
  );
}

export default HomeContainer;
