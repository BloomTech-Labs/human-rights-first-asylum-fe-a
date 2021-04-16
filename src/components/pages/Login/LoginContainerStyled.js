import styled from 'styled-components';
import statueOfLiberty from './statueOfLiberty.jpg';

export const StyledLogin = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 100vh;

  .background-image {
    background-image: url(${statueOfLiberty});
    width: 600px;
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    @media (max-width: 600px) {
      width: 0;
    }
  }

  #sign-in-widget {
    display: flex;
    align-items: center;
    margin: 0 auto;

    #okta-sign-in.auth-container.main-container {
      font-family: Helvetica, Arial, sans-serif;
      margin: 0;
    }

    .o-form-head {
      font-size: 2.4rem;
    }

    .button-primary {
      background: #bc541e;
      border: 1px solid #d39460;
    }

    .button-primary:hover {
      background: #d39460;
      border: 1px solid #d39460;
    }
  }
`;
