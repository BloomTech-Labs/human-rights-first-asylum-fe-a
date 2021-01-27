import styled from 'styled-components';

export const Container = styled.div`
  height: ${props => (props.containerHeight ? props.containerHeight : 'auto')};
  width: 75vw;
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e8eae6;
  margin: 10%;
  font-weight: bold;
  padding-top: 5%;
  font-size: 1.2rem;
`;

// CASE/JUDGE CONTAINER
export const CaseSpecs = styled.div`
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20%;
  background-color: #e8eae6;
  width: 35vw;
  margin-bottom: 5%;
`;

// CLIENT CONTAINER
export const ClientSpecs = styled.div`
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20%;
  background-color: #e8eae6;
  margin-bottom: 5%;
`;

// RESULTS
export const Results = styled.div`
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20%;
  background-color: #e8eae6;
  margin-bottom: 10%;
`;

export const KeyParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;

export const ValueParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;
