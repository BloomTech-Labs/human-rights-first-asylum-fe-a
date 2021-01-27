import React, { useState, useEffect, componentDidUpdate } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import JudgeTable from '../JudgeTable/JudgeTable';
// import { UploadCase } from '../Upload/UploadCase';
import { useLocation } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
// * Remove This
import JudgePage from '../JudgePage/JudgePage';
import { Route, Switch, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useOktaAuth } from '@okta/okta-react';
import SwitchTableIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';
import { hidden } from 'kleur';
import { FullscreenOverlay } from '../PDFViewer/PDFViewerStyled';
import useWindowDimensions from '../../../utils/useWindowDimensions';
import SavedCases from '../SavedCases/SavedCases';

// Imports for loading spinner
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';

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
  const [centerPDF, setCenterPDF] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  // should move these API calls into a separate index folder at some point

  useEffect(() => {
    // trackPromise(
    // Tracks the axios call and implements spinning loader while executing
    axios
      .get(`${process.env.REACT_APP_API_URI}/cases/`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      // )
      .then(res => {
        setCaseData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    trackPromise(
      // Tracks the axios call and implements spinning loader while executing
      axios.get(`${process.env.REACT_APP_API_URI}/judge`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
    )
      .then(res => {
        setJudgeData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profile/${userInfo.sub}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      .then(res => {
        setSavedCases(res.data.case_bookmarks);
        setSavedJudges(res.data.judge_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken, userInfo.sub, savedCases.length, savedJudges.length]);

  const deleteFromStateById = (id, state, setState) => {
    // i made this function non case specific but now I'm remembering that cases get deleted by name
    let index = state.findIndex(item => item.id === id);
    return setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  const deleteBookmark = caseID => {
    // only works for cases, judge requires name instead of ID to delete
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/profile/${userInfo.sub}/case/${caseID}`,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        }
      )
      .then(res => {
        deleteFromStateById(caseID, savedCases, setSavedCases);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteFromStateByName = (name, state, setState) => {
    let index = state.findIndex(item => item.judge_name === name);
    return setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  const formatJudgeName = name => {
    return name.split(' ').join('%20');
  };

  const deleteSavedJudge = name => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/profile/${
          userInfo.sub
        }/judge/${formatJudgeName(name)}`,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        }
      )
      .then(res => {
        deleteFromStateByName(name, savedJudges, setSavedJudges);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [smallPDF, setSmallPDF] = useState(false);
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
        savedJudges={savedJudges}
        deleteBookmark={deleteBookmark}
        deleteSavedJudge={deleteSavedJudge}
      />
      <Route exact path="/saved-cases">
        <SavedCases savedCases={savedCases} deleteBookmark={deleteBookmark} />
      </Route>
      <Route exact path="/judge/:name">
        <JudgePage
          // clicking on a judge name should bring you to a url with their name in it
          // get request to get details of that judge
          authState={authState}
        />
      </Route>

      <Route exact path="/">
        {showCaseTable && (
          <>
            <CaseTable
              showCaseTable={showCaseTable}
              setShowCaseTable={setShowCaseTable}
              caseData={caseData}
              userInfo={userInfo}
              savedCases={savedCases}
              setSavedCases={setSavedCases}
              authState={authState}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
            <Loader promiseTracker={usePromiseTracker} />
          </>
        )}
        {!showCaseTable && (
          <>
            <JudgeTable
              showCaseTable={showCaseTable}
              setShowCaseTable={setShowCaseTable}
              judgeData={judgeData}
              userInfo={userInfo}
              savedJudges={savedJudges}
              setSavedJudges={setSavedJudges}
              authState={authState}
            />
            <Loader promiseTracker={usePromiseTracker} />
          </>
        )}

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
      </Route>

      <Route exact path="/pdfviewer/:id">
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

      {/* <Route exact path="/uploadcase">
        <UploadCase />
      </Route> */}
    </div>
  );
}
export default RenderHomePage;
