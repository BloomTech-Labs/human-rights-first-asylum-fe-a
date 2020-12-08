import React, { useMemo, useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import DashboardNav from '../DashboardNav/DashboardNav';
import PDFViewer from '../PDFViewer/PDFViewer';

import axios from 'axios';
// import { Button } from '../../common';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [mainComponent, setMainComponent] = useState('PDFViewer');

  const logout = () => authService.logout;

  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}
      <div className="dashboard-container">
        <DashboardNav logout={logout} />

        {mainComponent === 'CaseTable' && <CaseTable />}

        {mainComponent === 'PDFViewer' && <PDFViewer />}
      </div>
    </div>
  );
}
export default RenderHomePage;
