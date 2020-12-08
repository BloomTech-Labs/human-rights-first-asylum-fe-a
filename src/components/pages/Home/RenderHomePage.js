import React, { useMemo, useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import DashboardNav from '../DashboardNav/DashboardNav';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Route, Switch } from 'react-router-dom';

import axios from 'axios';
// import { Button } from '../../common';

function RenderHomePage(props) {
  const { userInfo, authService } = props;

  const logout = () => authService.logout;

  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}
      <div className="dashboard-container">
        <DashboardNav logout={logout} />

        <Switch>
          <Route exact path="/">
            <CaseTable />
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
