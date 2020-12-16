import React, { useState, useEffect } from 'react';

import {
  Container,
  CaseSpecs,
  ClientSpecs,
  Results,
  KeyParagraph,
  ValueParagraph,
} from './CaseOverviewStyled';

const CaseOverview = props => {
  // DESTRUCTURING PROPS FROM CASE_DATA
  const {
    id,
    hearing_location,
    hearing_date,
    judge_name,
    court_type,
    refugee_origin,
    social_group_type,
    credibility_of_refugee,
    judge_decision,
    case_status,
  } = props.case_data | 'Here is some lorem ipsum';

  return (
    <Container
      containerHeight={props.componentHeight}
      containerWidth={props.componentWidth}
    >
      <CaseSpecs>
        <KeyParagraph>{id}</KeyParagraph>
        <KeyParagraph>Location: </KeyParagraph>
      </CaseSpecs>

      <ClientSpecs></ClientSpecs>

      <Results></Results>
    </Container>
  );
};

export default CaseOverview;
