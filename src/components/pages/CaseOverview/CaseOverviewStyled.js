import styled from 'styled-components';

export const Container = styled.div`
  height: ${props => (props.containerHeight ? props.containerHeight : 'auto')};
  width: 30%;
  border-radius: 2px;
  background-color: white;
  display: flex;
  flex-flow: row wrap;
  margin: 10% 15% 0% 22%;
  font-weight: bold;
  font-size: 1.2rem;
`;
