import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './_LoginContainerStyled.less';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// Below is the Human Rights logo
import logo from '../../../styles/hrf-logo.png';
import blue from '../../../styles/blue.svg';
import blue1 from '../../../styles/blue1.svg';
import blue2 from '../../../styles/blue2.svg';
import liberty from '../../../styles/liberty.png';

import { config } from '../../../utils/oktaConfig';

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
      'primaryauth.title': 'Sign in to continue',
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

const LoginContainer = () => {
  useEffect(() => {
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

    return () => {
      widget.remove();
    };
  }, []);

  const removeOktaSignIn = () => {
    widget.remove();
  };

  return (
    <div className="login-container">
      <div className="background">
        <div className="bgImgContain">
          <img className="liberty" src={liberty} alt="Statue of Liberty" />
        </div>
        <div className="svgContain">
          <img className="blueShape" src={blue} alt="bgSvg" />
          <img className="blueShape1" src={blue1} alt="bgSvg" />
          <img className="blueShape2" src={blue2} alt="bgSvg" />
        </div>
      </div>

      <div className="login-form">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login-page">
          <div id="sign-in-widget" aria-label="login form" />
          <p className="register">
            Don't have an account?{' '}
            <Link
              className="link-styles"
              to="/signup"
              onClick={removeOktaSignIn}
            >
              <span>Register here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
