import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: ${props => (props.componentWidth ? props.componentWidth : '60%')};
  height: ${props => (props.componentHeight ? props.componentHeight : 'auto')};
  display: flex;
  justify-content: center;
  border: 2px solid black;
  background-color: lightblue;
`;

export const PageControls = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
  width: 200px;
  height: 60px;
  left: ${props =>
    props.pageWidth
      ? `${props.pageWidth / 2 - 100}px`
      : `${((8.5 / 11) * props.pageHeight) / 2 - 100}px`};
  bottom: ${props =>
    props.pageWidth
      ? `${(11 / 8.5) * props.pageWidth * 0.15 + 30}px`
      : `${props.pageHeight * 0.15 + 30}px`};
  z-index: 998;
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  ${PageWrapper}:hover & {
    visibility: visible;
  }
`;

export const PageButton = styled.button`
  z-index: 999;
  width: 50px;
  height: 70%;
  margin: 0;
  background-color: white;
  border-radius: 25px;
  padding: 2%;
  margin: 0 6%;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  :hover {
    transition: ${props => (!props.disabled ? 'all 0.3s ease 0s' : 'none')};
    background-color: ${props =>
      !props.disabled ? 'rgb(127,155,179)' : 'white'};
    box-shadow: ${props =>
      !props.disabled
        ? '0px 15px 20px rgb(0,55,103)'
        : '0px 8px 15px rgba(0, 0, 0, 0.1)'};
    color: ${props => (!props.disabled ? 'black' : 'inherit')};
    transform: ${props => (!props.disabled ? 'translateY(-7px)' : 'none')};
  }
`;
