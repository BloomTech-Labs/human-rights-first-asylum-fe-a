import styled from 'styled-components';
import statueOfLiberty from '../../../styles/statueOfLiberty.jpg';

export const StyledLogin = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 100vh;

  .background-image {
    background-image: url(${statueOfLiberty});
    width: 600px;
    min-height: 100vh;
    background-position: top;
    background-repeat: no-repeat;
    @media (max-width: 600px) {
      width: 0;
    }
  }

  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .buttonStyles {
      margin-top: 3%;
      width: 50%;
    }
  }

  #sign-in-widget {
    display: flex;
    align-items: center;
    margin: 0 auto;

    #okta-sign-in.auth-container.main-container {
      font-family: 'Lato' sans-serif;
      margin: 0;
      border: none;
    }

    .o-form-head {
      font-size: 1.8rem;
    }

    .button-primary {
      background: #bd5a27;
      border: none;
      &:hover {
        background: #ffffff;
        border: 1px solid #bd5a27;
        color: #bd5a27;
      }
    }
  }
`;
