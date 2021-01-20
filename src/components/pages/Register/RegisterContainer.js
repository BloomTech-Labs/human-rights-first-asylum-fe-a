import React, { useEffect } from 'react';
import { StyledRegister } from './RegisterContainerStyled';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// Below is the Human Rights logo
import hrfLogo from './hrf-logo.png';

import { config } from '../../../utils/oktaConfig';

const RegisterContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;

    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {},
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: `${hrfLogo}`, // Import any logo you want to display at the top of the Register widget
      i18n: {
        en: {
          'primaryauth.title': 'Register',
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
    <StyledRegister>
      <div class="background-image" aria-label="cosmetic background image" />
      <div id="sign-in-widget" aria-label="Register form" />
    </StyledRegister>
  );
};

export default RegisterContainer;
