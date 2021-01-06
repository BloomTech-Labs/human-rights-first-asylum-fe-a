import React, { useState, useEffect, componentDidUpdate } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import JudgeTable from '../JudgeTable/JudgeTable';
import { useLocation } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
// * Remove This
import JudgePage from '../JudgePage/JudgePage';
import { Route, Switch, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useOktaAuth } from '@okta/okta-react';

import axios from 'axios';
import { hidden } from 'kleur';
import { FullscreenOverlay } from '../PDFViewer/PDFViewerStyled';
import useWindowDimensions from '../../../utils/useWindowDimensions';

import * as pdfFile from '../PDFViewer/samplePDF.pdf';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function RenderHomePage(props) {
  const { userInfo, authService, authState } = props;
  const [caseData, setCaseData] = useState([]);

  const [judgeData, setJudgeData] = useState([]);
  const [savedCases, setSavedCases] = useState([]);

  // should move these API calls into a separate index folder at some point

  useEffect(() => {
    axios
      .get('http://localhost:8080/case')
      .then(res => {
        setCaseData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/judge')
      .then(res => {
        setJudgeData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // need to reread on dependency arrays to understand them better
  useEffect(() => {
    axios
      .get(`http://localhost:8080/profile/${userInfo.sub}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      .then(res => {
        console.log(res.data);
        setSavedCases(res.data.case_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [smallPDF, setSmallPDF] = useState(true);
  const [file, setFile] = useState(pdfFile);
  const [location, setLocation] = useState(useLocation());
  const { height, width } = useWindowDimensions();

  const logout = () => authService.logout;
  const classes = useStyles();

  useEffect(() => {
    // API CALL TO GET DATA
  }, []);

  return (
    <JudgePage />
    // <div className={classes.container}>
    //   <SideDrawer logout={logout} userInfo={userInfo} />

    //   <Route path="/">
    //     <CaseTable
    //       caseData={caseData}
    //       userInfo={userInfo}
    //       savedCases={savedCases}
    //       setSavedCases={setSavedCases}
    //       authState={authState}
    //     />
    //     {/* <JudgeTable judgeData={judgeData} /> */}
    //   </Route>

    //   <Route path="/pdfviewer/:id">
    //     {/* FIXED DIV, 100VH 100VW, OVERLAY BACKGROUND, Z-INDEX 998, PDF VIEWER Z-INDEX 999 */}
    //     <FullscreenOverlay>
    //       <PDFViewer
    //         location={location}
    //         file={file}
    //         pageHeight={height <= 1023 ? height : '1023'}
    //         componentWidth="60%"
    //         componentHeight="100%"
    //       />
    //     </FullscreenOverlay>
    //   </Route>

    //   {smallPDF && (
    //     <PDFViewer
    //       setSmallPDF={setSmallPDF}
    //       notFullScreen={true}
    //       location={location}
    //       file={file}
    //       pageWidth="700"
    //       componentWidth="750px !important"
    //     />
    //   )}
    // </div>
  );
}
export default RenderHomePage;
