import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  caseDetails: {
    display: 'flex',
    marginLeft: 5,
  },
});

export function MyDoc(props) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text> LET THERE BE...PDF!!!</Text>
        {props.caseData.map(item => {
          return (
            <View>
              <Text>{item.case_id}</Text>
              <Text>{item.hearing_date}</Text>
              <Text>{item.case_origin}</Text>
              <Text>{item.application_type}</Text>
              <Text>{item.protected_ground}</Text>
              <Text>{item.case_outcome}</Text>
              <Text>{item.nation_of_origin}</Text>
              <Text>{item.applicant_gender}</Text>
              <Text>{item.applicant_language}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default MyDoc;
