import React, { useState, useEffect, useContext } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import JudgeTable from '../JudgeTable/JudgeTable';
import UploadCase from '../Upload/UploadCase';
import SideDrawer from '../SideDrawer/SideDrawer';
import JudgePage from '../JudgePage/JudgePage';
import CaseOverview from '../CaseOverview/CaseOverview';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../../context/UserContext';

import axios from 'axios';
import SavedCases from '../SavedCases/SavedCases';
import SavedJudges from '../SavedJudges/SavedJudges';

// Imports for loading spinner
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';
import CaseUpdate from '../CaseOverview/CaseUpdate';
import ManageCases from '../ManageCases/ManageCases';
import AccountPage from '../AccountPage/AccountPage';
import SupportPage from '../SupportPage/SupportPage';
import AddUsersPage from '../AddUsersPage/AddUsers';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function RenderHomePage(props) {
  const { uploadCase } = props;
  const [caseData, setCaseData] = useState([]);
  const [judgeData, setJudgeData] = useState([]);
  const [savedCases, setSavedCases] = useState([]);
  const [savedJudges, setSavedJudges] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [hrfUserInfo, setHrfUserInfo] = useState([]);

  const user = useContext(UserContext);

  // should move these API calls into a separate index folder at some point

  useEffect(() => {
    // trackPromise(
    // Tracks the axios call and implements spinning loader while executing
    axios
      .get(`${process.env.REACT_APP_API_URI}/cases`, {
        headers: {
          Authorization: 'Bearer ' + user.authState.idToken.idToken,
        },
      })
      // )
      .then(res => {
        setCaseData(
          res.data.map(eachCase => {
            return {
              ...eachCase,
              id: eachCase.primary_key,
            };
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, [user.authState.idToken.idToken]);

  useEffect(() => {
    trackPromise(
      // Tracks the axios call and implements spinning loader while executing
      axios.get(`${process.env.REACT_APP_API_URI}/judge`, {
        headers: {
          Authorization: 'Bearer ' + user.authState.idToken.idToken,
        },
      })
    )
      .then(res => {
        setJudgeData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user.authState.idToken.idToken]);

  useEffect(() => {
    trackPromise(
      axios.get(
        `${process.env.REACT_APP_API_URI}/profile/${user.userInfo.sub}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.authState.idToken.idToken,
          },
        }
      )
    )
      .then(res => {
        window.localStorage.setItem('Admin', res.data.is_admin);
        setHrfUserInfo(res.data);
        setSavedCases(res.data.case_bookmarks);
        setSavedJudges(res.data.judge_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  }, [
    user.authState.idToken.idToken,
    user.userInfo.sub,
    savedCases.length,
    savedJudges.length,
  ]);

  const deleteFromStateById = (id, state, setState) => {
    // i made this function non case specific but now I'm remembering that cases get deleted by name
    let index = state.findIndex(item => item.id === id);
    return setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  const deleteBookmark = caseID => {
    // only works for cases, judge requires name instead of ID to delete
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/profile/${user.userInfo.sub}/case/${caseID}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.authState.idToken.idToken,
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
    let index = state.findIndex(item => item.judge === name);
    return setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  const formatJudgeName = name => {
    // Used in order to format the judge so it can be used in the API call
    return name.split(' ').join('%20');
  };

  const deleteSavedJudge = name => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/profile/${
          user.userInfo.sub
        }/judge/${formatJudgeName(name)}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.authState.idToken.idToken,
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

  const logout = () => {
    window.localStorage.removeItem('Admin');
    user.oktaAuth.signOut();
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SideDrawer
        logout={logout}
        userInfo={user.userInfo}
        uploadCase={uploadCase}
        savedCases={savedCases}
        savedJudges={savedJudges}
        deleteBookmark={deleteBookmark}
        deleteSavedJudge={deleteSavedJudge}
      />

      <Route exact path="/upload-case">
        <UploadCase uploadCase={uploadCase} />
      </Route>
      <Route exact path="/saved-cases">
        <SavedCases savedCases={savedCases} deleteBookmark={deleteBookmark} />
      </Route>
      <Route exact path="/saved-judges">
        <SavedJudges
          savedJudges={savedJudges}
          deleteSavedJudge={deleteSavedJudge}
        />
      </Route>
      <Route exact path="/judge/:name">
        <JudgePage
          // clicking on a Judge should bring you to a url with their name in it
          // get request to get details of that judge
          authState={user.authState}
        />
      </Route>
      <Route exact path="/case/:id" authState={user.authState}>
        {/* clicking on a case name will bring you to a page where more indepth information
      about the case can be viewed, this page is linked to the cooresponding judge's page
      this page also links to the update case file which is not operational yet, see notation
      on CaseOverview & CaseUpdate for details */}
        <CaseOverview />
      </Route>
      <Route exact path="case/:id/update" authState={user.authState}>
        <CaseUpdate />
      </Route>
      <Route exact path="/manage-cases">
        <ManageCases />
      </Route>
      <Route exact path="/account">
        <AccountPage oktaUserInfo={user.userInfo} hrfUserInfo={hrfUserInfo} />
      </Route>
      <Route exact path="/support">
        <SupportPage />
      </Route>
      <Route exact path="/add-users">
        <AddUsersPage />
      </Route>

      <Route exact path="/">
        <>
          <CaseTable
            caseData={caseData}
            userInfo={user.userInfo}
            savedCases={savedCases}
            setSavedCases={setSavedCases}
            authState={user.authState}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          <Loader promiseTracker={usePromiseTracker} />
        </>
      </Route>
      <Route exact path="/judges">
        <>
          <JudgeTable
            judgeData={judgeData}
            userInfo={user.userInfo}
            savedJudges={savedJudges}
            setSavedJudges={setSavedJudges}
            authState={user.authState}
          />
          <Loader promiseTracker={usePromiseTracker} />
        </>
      </Route>
    </div>
  );
}
export default RenderHomePage;
