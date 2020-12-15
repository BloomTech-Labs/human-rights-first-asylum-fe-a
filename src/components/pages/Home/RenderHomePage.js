import React, { useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';

import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { hidden } from 'kleur';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [caseData, setCaseData] = useState([]);
  const [smallPDF, setSmallPDF] = useState(false);

  const logout = () => authService.logout;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SideDrawer logout={logout} userInfo={userInfo} />

      <Route path="/">
        <CaseTable caseData={caseData} />
      </Route>

      <Route path="/pdfviewer/:id">
        {/* FIXED DIV, 100VH 100VW, OVERLAY BACKGROUND, Z-INDEX 998, PDF VIEWER Z-INDEX 999 */}
        <PDFViewer pageWidth="800" componentWidth="1400px" />
      </Route>

      {smallPDF && <PDFViewer pageWidth="" componentWidth="20%" />}
    </div>
  );
}
export default RenderHomePage;
