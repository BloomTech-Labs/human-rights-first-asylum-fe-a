import React, { useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';

import SideDrawer from '../SideDrawer/SideDrawer';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [caseData, setCaseData] = useState([]);
  const [judgeData, setJudgeData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/case')
  //     .then(res => {
  //       setCaseData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/judge')
      .then(res => {
        setJudgeData(res.data);
        console.log(res.data);
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
            <CaseTable caseData={caseData} />
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
