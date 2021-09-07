import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import hrfLogo from '../../../../styles/HRFlogo.png';
import exampleImage from './ExampleReport.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 25,
  },
  caseDetails: {
    display: 'flex',
    marginLeft: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5',
    marginBottom: 10,
  },
  logo: {
    width: '240',
    height: 'auto',
    padding: 5,
  },
  reportDate: {
    fontSize: 12,
  },
  sampledCases: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 8,
  },
  columnNameCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 8,
    fontWeight: 'Bold',
  },
});

export function MyDoc(props) {
  // date has a UTC format from the database
  // convertDate/localDate formats it to a correctly configured date string
  const convertDate = new Date(props.caseData[0].date);
  const localDate = convertDate.toLocaleDateString();
  const reportDate = new Date().toLocaleDateString();

  // At this time, there is some data that returns a boolean
  // This function converts the boolean to Yes/No for user readability
  const convertTrueFalse = input => {
    if (input === true) {
      return 'Yes';
    } else if (input === false) {
      return 'No';
    } else {
      return 'Unknown';
    }
  };

  return (
    <Document>
      <Page style={styles.page} size="LETTER" orientation="landscape">
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image source={hrfLogo} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.reportDate}>Report Date: {reportDate}</Text>
          </View>
        </View>
        <View style={styles.sampledCases}>
          <Text>
            Number of sampled cases: (Number of presiding judge cases sampled)
          </Text>
        </View>

        {/* Body */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Case #</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Case Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Judge</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Case Origin</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Case Outcome</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Country of Origin</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Applicant Gender</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Violence</Text>
            </View>
          </View>
          {props.caseData.map(item => {
            return (
              <View key={item.case_id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.case_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{localDate}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.last_name}, {item.first_name}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.case_origin_city}, {item.case_origin_state}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.outcome}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.country_of_origin}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.gender}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.type_of_persecution}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Appellate</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Filed in One Year</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Applicant Language</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Application Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Credible?</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Indigenous Group</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Protected Grounds</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.columnNameCell}>Case Link</Text>
            </View>
          </View>
          {props.caseData.map(item => {
            return (
              <View key={item.number} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {convertTrueFalse(item.appellate)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {convertTrueFalse(item.filed_in_one_year)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.applicant_language}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.application_type}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {convertTrueFalse(item.credible)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.indigenous_group}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.protected_grounds}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <a href={item.url}>Click Here</a>
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        {/* Temporary view of envisioned report - Delete image file when report is finalized */}
        {/* Work with stakeholders to develop meaningful report */}
        <View>
          <View>
            <Image source={exampleImage} alt="temporary" />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default MyDoc;
