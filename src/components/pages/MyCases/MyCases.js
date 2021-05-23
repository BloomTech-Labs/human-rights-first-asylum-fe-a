import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridColumnsToolbarButton } from '@material-ui/data-grid';
import { Modal, Button, Typography } from 'antd';
import { ReloadOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import './MyCases.less';
import ReviewCaseForm from './ReviewCaseForm';
const initialFormValues = {
  date: 'new Date()',
  judge: '',
  case_outcome: '',
  country_of_origin: '',
  protected_grounds: '',
  application_type: '',
  case_origin_city: '',
  case_origin_state: '',
  gender: '',
  applicant_language: '',
  indigenous_group: '',
  type_of_violence: '',
  initial_or_appellate: false,
  filed_in_one_year: false,
  credible: false,
};
export default function MyCases(props) {
  const { Title } = Typography;
  const [tabValue, setTabValue] = useState(0);
  const { user, myPendingCases, getPendingCases } = props;
  const [myApprovedCases, setMyApprovedCases] = useState([]);
  const [selectedTab, setSelectedTab] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [visible, setVisible] = useState(false);
  const role = window.localStorage.getItem('role');
  const [currentId, setCurrentId] = useState();
  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    getPendingCases();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    trackPromise(axiosWithAuth().get(`/cases/user/:${user.userInfo.sub}`))
      .then(res => {
        setMyApprovedCases(
          res.data.map(eachCase => {
            return {
              ...eachCase,
              id: eachCase.case_number,
            };
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  const pendingColumns = [
    {
      field: 'file_name',
      renderHeader: params => <strong>{'File Name'}</strong>,
      headerName: 'file_name',
      flex: 1,
      headerAlign: 'center',
      options: {
        filter: true,
      },
    },
    {
      field: 'uploaded',
      renderHeader: params => <strong>{'Uploaded On'}</strong>,
      headerName: 'Uploaded',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'case_url',
      renderHeader: params => <strong>{'View PDF'}</strong>,
      headerName: 'PDF',
      headerAlign: 'center',
      flex: 1,
      renderCell: params => (
        <Button
          size="small"
          style={{ backgroundColor: 'aliceblue' }}
          icon={
            <svg
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.363 2C13.518 2 12 8 12 8C12 8 18 6.35 18 10.457V22H2V2H9.363ZM10.189 0H0V24H20V9.614C20 7.223 13.352 0 10.189 0ZM15 13H12.372V16.686H13.279V15.214H14.769V14.482H13.279V13.784H15V13ZM10.1 13H8.501V16.686H10.1C10.637 16.686 11.061 16.505 11.362 16.151C11.917 15.493 11.949 14.117 11.3 13.459C11.002 13.159 10.588 13 10.1 13ZM9.408 13.783H9.904C10.377 13.783 10.706 13.956 10.819 14.427C10.883 14.694 10.896 15.106 10.798 15.375C10.67 15.726 10.417 15.903 10.044 15.903H9.407V13.783H9.408ZM6.668 13H5V16.686H5.907V15.409H6.668C7.287 15.409 7.732 15.132 7.892 14.646C7.987 14.355 7.987 14.049 7.892 13.761C7.732 13.277 7.286 13 6.668 13ZM5.907 13.732H6.453C6.688 13.732 6.92 13.76 7.029 13.96C7.096 14.083 7.096 14.326 7.029 14.449C6.92 14.648 6.688 14.676 6.453 14.676H5.907V13.732Z"
                fill="#BD5A27"
              />
            </svg>
          }
          onClick={e => {
            e.preventDefault();
          }}
        ></Button>
      ),
    },
    {
      field: 'status',
      renderHeader: params => <strong>{'Status'}</strong>,
      headerName: 'Status',
      headerAlign: 'center',
      flex: 1,
      renderCell: params =>
        params.row.status !== 'Review' ? (
          params.row.status
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              size="small"
              style={{ backgroundColor: '#2a5c8d', color: 'white' }}
              onClick={e => {
                e.preventDefault();
                showModal(params.row);
                setCurrentId(params.row.pending_case_id);
              }}
            >
              Review
            </Button>
            <ExclamationCircleTwoTone twoToneColor="red" />
          </div>
        ),
    },
    {
      field: 'pending_case_id',
      renderHeader: params => <strong>{'Cancel'}</strong>,
      headerName: 'Cancel',
      headerAlign: 'center',
      flex: 0.4,
      renderCell: params => (
        <Button
          size="small"
          shape="circle"
          style={{ backgroundColor: 'aliceblue' }}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z"
                fill="#CACCCF"
              />
            </svg>
          }
          onClick={e => {
            e.preventDefault();
            onDelete(params.row.pending_case_id);
          }}
        ></Button>
      ),
    },
  ];
  const approvedColumns = [
    {
      field: 'case_number',
      renderHeader: params => <strong>{'Case Number'}</strong>,
      headerName: 'Case Number',
      flex: 1,
      headerAlign: 'center',
      options: {
        filter: true,
      },

      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} className="caseTableLink">
            <span> {params.row['case_number']}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'pdf',
      renderHeader: params => <strong>{'View PDF'}</strong>,
      headerName: 'PDF',
      headerAlign: 'center',
      flex: 1,
      renderCell: params => (
        <Button
          size="small"
          style={{ backgroundColor: 'aliceblue' }}
          icon={
            <svg
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.363 2C13.518 2 12 8 12 8C12 8 18 6.35 18 10.457V22H2V2H9.363ZM10.189 0H0V24H20V9.614C20 7.223 13.352 0 10.189 0ZM15 13H12.372V16.686H13.279V15.214H14.769V14.482H13.279V13.784H15V13ZM10.1 13H8.501V16.686H10.1C10.637 16.686 11.061 16.505 11.362 16.151C11.917 15.493 11.949 14.117 11.3 13.459C11.002 13.159 10.588 13 10.1 13ZM9.408 13.783H9.904C10.377 13.783 10.706 13.956 10.819 14.427C10.883 14.694 10.896 15.106 10.798 15.375C10.67 15.726 10.417 15.903 10.044 15.903H9.407V13.783H9.408ZM6.668 13H5V16.686H5.907V15.409H6.668C7.287 15.409 7.732 15.132 7.892 14.646C7.987 14.355 7.987 14.049 7.892 13.761C7.732 13.277 7.286 13 6.668 13ZM5.907 13.732H6.453C6.688 13.732 6.92 13.76 7.029 13.96C7.096 14.083 7.096 14.326 7.029 14.449C6.92 14.648 6.688 14.676 6.453 14.676H5.907V13.732Z"
                fill="#BD5A27"
              />
            </svg>
          }
        ></Button>
      ),
    },
    {
      field: 'status',
      renderHeader: params => <strong>{'Status'}</strong>,
      headerName: 'Status',
      headerAlign: 'center',
      flex: 1,
      renderCell: params => <span>Approved</span>,
    },
  ];

  const showModal = values => {
    setVisible(true);
    setFormValues(values);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const CustomToolbar = () => {
    return (
      <div className="menuContainer">
        <Title level={2}>
          {
            <AppBar
              position="static"
              classes={{ root: classes.root }}
              elevation={0}
            >
              <Tabs
                value={tabValue}
                onChange={onChange}
                aria-label="Types of Cases"
                classes={{
                  root: classes.root,
                  indicator: classes.tabIndicator,
                }}
              >
                <Tab label="My Pending Cases" />
                <Tab label="My Approved Cases" />
              </Tabs>
            </AppBar>
          }
        </Title>
        <div className="buttonContainer">
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}></Button>
          <GridColumnsToolbarButton onClick={e => e.preventDefault()} />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H24L14.1818 15.094V24L9.81818 21V15.094L0 0Z"
              fill="grey"
            />
          </svg>
        </div>
      </div>
    );
  };
  const onDelete = case_id => {
    trackPromise(axiosWithAuth().delete(`/pendingCases/${case_id}`))
      .then(res => {
        getPendingCases();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onChange = (e, newTabValue) => {
    setTabValue(newTabValue);
    setSelectedTab(!selectedTab);
  };
  const handleRefresh = () => {
    getPendingCases();
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        className="tabPanel"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const useStyles = makeStyles(theme => ({
    root: {
      background: '#fff',
      color: '#215589',
      height: 48,
      zIndex: 1,
      fontSize: 5,
    },
    tabIndicator: {
      backgroundColor: '#c95202',
      height: 4,
    },
    tabPanel: {
      width: '100%',
    },
  }));
  const classes = useStyles();
  return (
    <div className="myCaseTableContainer">
      <TabPanel className={classes.tabPanel} value={tabValue} index={0}>
        <div className="myCaseTableGridContainer">
          <DataGrid
            rows={myPendingCases}
            columns={pendingColumns}
            className="myCaseTable"
            loading={myPendingCases ? false : true}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={tabValue} index={1}>
        <div className="myCaseTableGridContainer">
          <DataGrid
            rows={myApprovedCases}
            columns={approvedColumns}
            className="myCaseTable"
            loading={myApprovedCases ? false : true}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
      <Modal
        title="Review Case Details"
        visible={visible}
        onCancel={handleCancel}
        footer={[]}
      >
        <ReviewCaseForm
          formValues={formValues}
          onInputChange={onInputChange}
          currentId={currentId}
          getPendingCases={getPendingCases}
          setVisible={setVisible}
        />
      </Modal>
    </div>
  );
}
