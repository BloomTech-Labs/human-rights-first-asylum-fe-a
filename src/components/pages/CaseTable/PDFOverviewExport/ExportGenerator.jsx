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
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '2%',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

export function MyDoc(props) {
  return (
    <Document>
      <Page style={styles.page}>
        <Image source={hrfLogo} style={styles.logo} />
        {props.caseData.map(item => {
          return (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.case_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.hearing_date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.case_origin}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.application_type}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.protected_ground}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.case_outcome}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.nation_of_origin}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.applicant_gender}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.applicant_language}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default MyDoc;
