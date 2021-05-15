import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './_LoginContainerStyled.less';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// Below is the Human Rights logo
import logo from '../../../styles/hrf-logo.png';

import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;

    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {},
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      i18n: {
        en: {
          'primaryauth.title': 'Log in to Continue',
          'primaryauth.username.placeholder': 'Email Address',
          'password.forgot.email.or.username.placeholder': 'Email Address',
          'password.forgot.email.or.username.tooltip': ' ',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return (
    <div className="root">
      <div
        className="background-image"
        aria-label="cosmetic background image"
      />
      <div className="form">
        <div className="logo">
          <img src={logo} alt="logo" width="350px" />
        </div>
        <div className="login-page">
          <div id="sign-in-widget" aria-label="login form" />
          <Link className="link-styles" to="/signup">
            <p>Don't have an account? Register here</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
