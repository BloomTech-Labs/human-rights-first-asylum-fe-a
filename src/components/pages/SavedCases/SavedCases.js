import React /*, { useEffect }*/ from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Icon from '@ant-design/icons';
import Delete from '../../../styles/icons/delete.svg';
import Case from '../../../styles/icons/case.svg';
import PDF from '../../../styles/icons/pdf.svg';
import './_SavedCasesStyles.less';
import PDFExportButton from '../Cases/PDFOverviewExport/PDFExportButton';

// import axiosWithAuth from '../../../utils/axiosWithAuth';

function SavedCases({ savedCases, setSavedCases, deleteBookmark }) {
  /* 
  
      - This useEffect was used to pass the presiding judge's cases data to the ExportGenerator
    
      - There was a recent change on the backend that broke it

      - As the function stands now, the report needs a number of cases for the presiding judge as well as ruling info to compare to the saved cases
      
      useEffect(() => {
        savedCases.forEach(item => {
          axiosWithAuth()
            .get(`/judge/${item.judge_id}/cases`)
            .then(res => {
              console.log(res);
              // Send data to the export generator
              // Hopefully, DS can create data structure that can be used on the report
            })
            .catch(err => {
              throw new Error(err);
            });
        });
      });

  */

  const handleClick = deleteCase => {
    deleteBookmark(deleteCase);
    setSavedCases(
      savedCases.filter(savedCase => savedCase.case_id !== deleteCase)
    );
  };

  const columns = [
    {
      title: 'Case',
      dataIndex: 'case_id',
      key: 'case_id',
      render: (text, record) => (
        <Link to={`/case/${record.case_id}`}>
          <Icon component={() => <img src={Case} alt="case icon" />} />
        </Link>
      ),
      width: '5%',
    },
    {
      title: 'Download Case',
      dataIndex: 'url',
      key: 'url',
      render: (text, record) => (
        <a href={record.url}>
          <Icon component={() => <img src={PDF} alt="download" />} />
        </a>
      ),
      width: '5%',
    },
    {
      title: 'Download Report',
      render: (text, record) => (
        <PDFExportButton
          key="export"
          fileName={`Judge_${record.last_name}_Case_${record.number}`}
          caseData={[
            {
              appellate: record.appellate,
              applicant_language: record.applicant_language,
              application_type: record.application_type,
              case_id: record.number,
              case_origin_city: record.case_origin_city,
              case_origin_state: record.case_origin_state,
              country_of_origin: record.country_of_origin,
              credible: record.credible,
              date: record.date,
              check_for_one_year: record.check_for_one_year,
              first_name: record.first_name,
              gender: record.gender,
              indigenous_group: record.indigenous_group,
              judge_id: record.judge_id,
              last_name: record.last_name,
              middle_initial: record.middle_initial,
              number: record.number,
              outcome: record.outcome,
              protected_grounds: record.protected_grounds,
              status: record.status,
              type_of_violence: record.type_of_violence,
              url: record.url,
            },
          ]} /*viz={}*/
        />
      ),
      width: '5%',
    },
    {
      title: 'Judge',
      dataIndex: 'judge_id',
      key: 'judge_id',
      width: '17%',
      render: (text, record) => (
        <Link to={`/judge/${record.judge_id}`}>
          {record.first_name}
          <span> </span>
          {record.middle_initial}
          <span> </span>
          {record.last_name}
        </Link>
      ),
    },
    {
      title: 'City',
      dataIndex: 'case_origin_city',
      key: 'case_origin_city',
      width: '10%',
    },
    {
      title: 'Country of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
      width: '20%',
    },
    {
      title: 'Protected Grounds',
      dataIndex: 'protected_grounds',
      key: 'protected_grounds',
      width: '20%',
    },
    {
      title: 'Outcome',
      dataIndex: 'outcome',
      key: 'outcome',
      width: '10%',
    },
    {
      title: 'Application Type',
      dataIndex: 'application_type',
      key: 'application_type',
      width: '15%',
    },
    {
      title: 'Remove',
      key: 'remove',
      width: '5%',
      render: (text, record) => (
        <Icon
          onClick={() => handleClick(record.case_id)}
          component={() => <img src={Delete} alt="delete icon" />}
        />
      ),
    },
  ];

  return (
    <div className="savedCasesContainer">
      <div className="savedCases">
        <h2 className="saved-cases-header">Saved Cases</h2>

        <Table
          rowKey={record => record.case_id}
          columns={columns}
          dataSource={savedCases}
        />
      </div>
    </div>
  );
}

export default SavedCases;
