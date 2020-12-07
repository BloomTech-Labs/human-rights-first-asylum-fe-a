import styled from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 8vh 8% 0 8%;

  #sign-in-widget {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-200px, -400px);
  }
`;

export const Header = styled.h1`
  font-size: 4rem;
  margin-bottom: 5%;
`;

export const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const LeftSide = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 9rem;
    margin-right: 5%;
  }
  h2 {
    font-size: 3rem;
    margin: 0;
    line-height: 5rem;
  }
`;
export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  margin-right: 10%;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 1.5rem;
      margin: 0;
    }
  }
`;

export const LoginButtonDiv = styled.div`
  width: 100%;
  padding: 0 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SecureLogin = styled.button``;
// export const BotDiv =
