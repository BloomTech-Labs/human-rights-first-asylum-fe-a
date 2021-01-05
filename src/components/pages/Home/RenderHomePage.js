import React, { useState, useEffect, componentDidUpdate } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import JudgeTable from '../JudgeTable/JudgeTable';
import { useLocation } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useOktaAuth } from '@okta/okta-react';
import SwitchTableIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';

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
  const [showCaseTable, setShowCaseTable] = useState(true);
  const [savedJudges, setSavedJudges] = useState([]);

  // should move these API calls into a separate index folder at some point

  useEffect(() => {
    axios
      .get('http://localhost:8080/case', {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      .then(res => {
        setCaseData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/judge', {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
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
        // set saved Judges here as well
        setSavedJudges(res.data.judge_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken, userInfo.sub, savedCases.length, savedJudges.length]); // can't think of any instances when just using length doesn't hit what i'm looking for

  const deleteFromStateById = (id, state, setState) => {
    let index = state.findIndex(item => item.id === id);
    console.log(index);
    return setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  const deleteBookmark = caseID => {
    axios
      .delete(`http://localhost:8080/profile/${userInfo.sub}/case/${caseID}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      .then(res => {
        deleteFromStateById(caseID, savedCases, setSavedCases);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [smallPDF, setSmallPDF] = useState(true);
  const [file, setFile] = useState(pdfFile);
  const [location, setLocation] = useState(useLocation());
  const { height, width } = useWindowDimensions();

  const logout = () => authService.logout;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SideDrawer
        logout={logout}
        userInfo={userInfo}
        savedCases={savedCases}
        deleteBookmark={deleteBookmark}
      />

      <Route path="/">
        <button
          style={{ height: 70, marginTop: 160, marginRight: 50 }}
          onClick={() => setShowCaseTable(!showCaseTable)}
        >
          {showCaseTable ? 'View Judges' : 'View Cases'}
        </button>
        {showCaseTable && (
          <CaseTable
            caseData={caseData}
            userInfo={userInfo}
            savedCases={savedCases}
            setSavedCases={setSavedCases}
            authState={authState}
          />
        )}
        {!showCaseTable && (
          <JudgeTable
            judgeData={judgeData}
            userInfo={userInfo}
            savedJudges={savedJudges}
            setSavedJudges={setSavedJudges}
            authState={authState}
          />
        )}
      </Route>

      <Route path="/pdfviewer/:id">
        {/* FIXED DIV, 100VH 100VW, OVERLAY BACKGROUND, Z-INDEX 998, PDF VIEWER Z-INDEX 999 */}
        <FullscreenOverlay>
          <PDFViewer
            location={location}
            file={file}
            pageHeight={height <= 1023 ? height : '1023'}
            componentWidth="60%"
            componentHeight="100%"
          />
        </FullscreenOverlay>
      </Route>

      {smallPDF && (
        <PDFViewer
          setSmallPDF={setSmallPDF}
          notFullScreen={true}
          location={location}
          file={file}
          pageWidth="700"
          componentWidth="750px !important"
        />
      )}
    </div>
  );
}
export default RenderHomePage;
