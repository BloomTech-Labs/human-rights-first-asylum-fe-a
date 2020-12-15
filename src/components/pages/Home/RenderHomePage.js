import React, { useState, useEffect, componentDidUpdate } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import JudgeTable from '../JudgeTable/JudgeTable';
import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useOktaAuth } from '@okta/okta-react';

import axios from 'axios';

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

  const logout = () => authService.logout;
  const classes = useStyles();
  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}

      <div className={classes.container}>
        <SideDrawer logout={logout} userInfo={userInfo} />

        <Switch>
          <Route exact path="/">
            <CaseTable
              caseData={caseData}
              userInfo={userInfo}
              savedCases={savedCases}
            />
            {/* <JudgeTable judgeData={judgeData} /> */}
          </Route>

          <Route path="/pdfviewer/:id">
            <PDFViewer />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default RenderHomePage;
