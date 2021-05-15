import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridColumnsToolbarButton } from '@material-ui/data-grid';
import { Button, Typography } from 'antd';
import { DeleteTwoTone, FilePdfTwoTone } from '@ant-design/icons';
import './MyCases.less';
export default function MyCases(props) {
  const { Title } = Typography;
  const [tabValue, setTabValue] = useState(0);
  const { caseData, userInfo, authState } = props;
  const [showPdf, setShowPdf] = useState(false);

  const columns = [
    {
      field: 'case_number',
      renderHeader: params => <strong>{'Case Number'}</strong>,
      headerName: 'Case Number',
      flex: 1,
      options: {
        filter: true,
      },
      //link to individual case page

      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} className="caseTableLink">
            <span> {params.row['case_number']}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'date',
      renderHeader: params => <strong>{'Uploaded On'}</strong>,
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'pdf',
      renderHeader: params => <strong>{'View PDF'}</strong>,
      headerName: 'PDF',
      flex: 1,
      renderCell: params => (
        <>
          <FilePdfTwoTone onClick={() => {}} />
        </>
      ),
    },
    {
      field: 'status',
      renderHeader: params => <strong>{'Status'}</strong>,
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'delete',
      renderHeader: params => <strong>{'Delete'}</strong>,
      headerName: 'Delete',
      flex: 0.3,
      renderCell: params => (
        <>
          <DeleteTwoTone twoToneColor="red" onClick={() => {}} />
        </>
      ),
    },
  ];
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
                <Tab label="Pending Cases" />
                <Tab label="Approved Cases" />
              </Tabs>
            </AppBar>
          }
        </Title>
        <div className="buttonContainer">
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

  const onChange = (e, newTabValue) => {
    setTabValue(newTabValue);
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
    <div className="caseTableContainer">
      <TabPanel className={classes.tabPanel} value={tabValue} index={0}>
        <div className="caseTableGridContainer">
          <DataGrid
            rows={caseData}
            columns={columns}
            className="caseTable"
            loading={caseData ? false : true}
            checkboxSelection={true}
            showCellRightBorder={false}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={tabValue} index={1}>
        <div className="caseTableGridContainer">
          <DataGrid
            rows={caseData}
            columns={columns}
            className="caseTable"
            loading={caseData ? false : true}
            checkboxSelection={true}
            showCellRightBorder={false}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
    </div>
  );
}
