import React, { useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';

import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { hidden } from 'kleur';

import * as pdfFile from '../PDFViewer/samplePDF.pdf';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [caseData, setCaseData] = useState([]);
  const [smallPDF, setSmallPDF] = useState(true);
  const [file, setFile] = useState(pdfFile);

  const logout = () => authService.logout;
  const classes = useStyles();

  useEffect(() => {
    // API CALL TO GET DATA
  }, []);

  return (
    <div className={classes.container}>
      <SideDrawer logout={logout} userInfo={userInfo} />

      <Route path="/">
        <CaseTable caseData={caseData} />
      </Route>

      {/* <Route path="/pdfviewer/:id"> */}
      {/* FIXED DIV, 100VH 100VW, OVERLAY BACKGROUND, Z-INDEX 998, PDF VIEWER Z-INDEX 999 */}
      {/* <PDFViewer file={file} pageWidth="" componentWidth="" /> */}
      {/* </Route> */}

      {/* {smallPDF && <PDFViewer file={file} pageWidth="" componentWidth="" />} */}
    </div>
  );
}
export default RenderHomePage;
