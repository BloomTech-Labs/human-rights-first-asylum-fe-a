import styled from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 8vh 6% 0 6%;

  #sign-in-widget {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-200px, -400px);
    z-index: 999;
  }
`;

export const Header = styled.h1`
  font-size: 4rem;
  margin-bottom: 5%;
`;

export const InfoDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const LeftSide = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 8rem;
    width: 22vw;
    padding-right: 6%;
  }
  h2 {
    font-size: 5rem;
    margin: 0;
    line-height: 7rem;
  }
`;
export const RightSide = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    width: 85%;
    justify-content: space-between;
    align-items: center;
    margin: 3% 0;
    p {
      font-size: 2.5rem;
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

export const OverlayDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(127, 155, 179, 0.4);
`;

export const CloseLogin = styled.button`
  position: absolute;
  top: 50vh;
  right: 50vw;
  transform: translate(195px, -295px);
  z-index: 999;
`;
