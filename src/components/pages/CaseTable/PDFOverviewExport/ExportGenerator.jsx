import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import hrfLogo from '../../SideDrawer/HRFlogo.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  caseDetails: {
    display: 'flex',
    marginLeft: 5,
  },
  logo: {
    width: '50%',
    height: 'auto',
  },
});

export function MyDoc(props) {
  return (
    <Document>
      <Page style={styles.page}>
        <Image source={hrfLogo} style={styles.logo} />
        <Image src={props.viz} />
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
