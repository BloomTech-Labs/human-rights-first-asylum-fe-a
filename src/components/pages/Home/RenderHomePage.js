import React, { useState, useEffect } from 'react';
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

  console.log(userInfo.sub);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/profile/${userInfo.sub}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken,
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken]);

  const logout = () => authService.logout;
  const classes = useStyles();
  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}

      <div className={classes.container}>
        <SideDrawer logout={logout} userInfo={userInfo} />

        <Switch>
          <Route exact path="/">
            <CaseTable caseData={caseData} />
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
