import styled from 'styled-components';

export const Container = styled.div`
  height: ${props => (props.containerHeight ? props.containerHeight : 'auto')};
  width: 100%;
  border-radius: 2px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  background-color: #e8eae6;
  display: flex;
  flex-flow: row wrap;
  margin: 5% 4% 0 0;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const CaseSpecs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  padding-bottom: 0%;
  margin: 5%;
  margin-bottom: 0%;
  width: 100%;
`;

export const ClientSpecs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin: 5%;
  margin-top: 1%;
  margin-bottom: 1%;
  width: 100%;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 5%;
  padding-top: 0%;
  margin: 5%;
  margin-top: 0%;
  width: 100%;
`;

export const KeyParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;

export const ValueParagraph = styled.p`
  font-weight: normal;
  padding: 2%;
`;
