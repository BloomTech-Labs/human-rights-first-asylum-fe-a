import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const MyDoc = () => {
  return (
    <Document>
      <Page>
        <Text> LET THERE BE PDF </Text>
      </Page>
    </Document>
  );
};

export default MyDoc;
