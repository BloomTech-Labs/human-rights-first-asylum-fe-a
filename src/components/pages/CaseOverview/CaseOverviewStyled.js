import styled from 'styled-components';

export const Container = styled.div`
  height: ${props => (props.containerHeight ? props.containerHeight : 'auto')};
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin: 5% 4% 0 0;
  font-weight: bold;
  font-size: 1.2rem;
`;

// CASE/JUDGE CONTAINER
export const CaseSpecs = styled.div`
  border-radius: 2px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  background-color: #e8eae6;
  margin: 5%;
  width: 40%;
`;

// CLIENT CONTAINER
export const ClientSpecs = styled.div`
  border-radius: 2px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  background-color: #e8eae6;
  margin: 5%;
  width: 40%;
`;

// RESULTS
export const Results = styled.div`
  border-radius: 2px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  background-color: #e8eae6;
  margin: 5%;
  width: 40%;
`;

export const KeyParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;

export const ValueParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;
