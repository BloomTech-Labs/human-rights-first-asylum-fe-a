import React from 'react';
import CaseTable from '../Dashboard/CaseTable';
// import { Button } from '../../common';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div>
      <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
      <div className="dashboard-container"></div>

      <button className="logout-btn" onClick={() => authService.logout()}>
        Logout
      </button>
    </div>
  );
}
export default RenderHomePage;

// This is just what was initially on the homepage
// <p>
//           <Link to="/profile-list">Profiles Example</Link>
//         </p>
//         <p>
//           <Link to="/example-list">Example List of Items</Link>
//         </p>
//         <p>
//           <Link to="/datavis">Data Visualizations Example</Link>
//         </p>
