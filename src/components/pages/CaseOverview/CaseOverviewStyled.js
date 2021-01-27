import styled from 'styled-components';

export const Container = styled.div`
  height: ${props => (props.containerHeight ? props.containerHeight : 'auto')};
  width: 65%;
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e8eae6;
  margin-top: 20%;
  font-weight: bold;
  padding-top: 5%;
  font-size: 1rem;
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
  width: 500px;
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
`;

export const KeyParagraph = styled.p`
  font-weight: normal;
`;

export const ValueParagraph = styled.p`
  font-weight: normal;
`;
