import React, { useState } from 'react';
import { Button as AntDButton, Modal } from 'antd';
import '../AdminTools/_ManageUsersStyles.less';
import EditCaseDetails from '../CaseOverview/EditCaseDetails';
import moment from 'moment';

const CaseDetails = props => {
  const { caseData, isDetailsVisible, setIsDetailsVisible } = props;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const theDate = new Date(caseData.decision_date);
  const converted = moment(theDate).format('MMMM D, Y');

  return (
    <Modal
      title=""
      visible={isDetailsVisible}
      onCancel={handleCancel}
      footer={[
        <div className="submit-button">
          <AntDButton
            htmlType="submit"
            className="add-user-btn"
            onClick={handleCancel}
          >
            <span>Ok</span>
          </AntDButton>
          {localStorage.role === 'admin' || '' ? (
            <AntDButton className="btn-style" onClick={showEditModal}>
              Edit
            </AntDButton>
          ) : (
            <></>
          )}
        </div>,
      ]}
    >
      <h2 className="h1Styles">Case Details</h2>
      <div className="divider" />
      <div>
        <p>{`Case Date: ${converted}`}</p>
        <p>{`Judge Name: ${caseData.first_name} ${caseData.middle_initial}. ${caseData.last_name}`}</p>
        <p>{`Origin City: ${caseData.case_origin_city}`}</p>
        <p>{`Origin State: ${caseData.case_origin_state}`}</p>
        <p>{`Gender: ${caseData.gender}`}</p>
        <p>{`Type of Persecution: ${caseData.type_of_persecution}`}</p>
        <p>{`Indigenous Group: ${caseData.indigenous_group}`}</p>
        <p>{`Protected Grounds: ${caseData.protected_grounds}`}</p>
        <p>{`Outcome: ${caseData.outcome}`}</p>
        <p>{`Country of Origin: ${caseData.country_of_origin}`}</p>
        <p>{`Filed Within One Year: ${caseData.check_for_one_year}`}</p>
        <p>{`Applicant Language: ${caseData.applicant_language}`}</p>
        {/* the segment below displays the disclaimer message with the details requested by the stakeholders*/}
        <br></br>
        <p>
          This {caseData.appellate === true ? 'appellate' : 'initial'} case was
          heard on {converted} in {caseData.case_origin_city},{' '}
          {caseData.case_origin_state} by Judge {caseData.first_name}{' '}
          {caseData.middle_initial}. {caseData.last_name}. The applicant comes
          from {caseData.country_of_origin} and speaks{' '}
          {caseData.applicant_language}; they have applied for asylum under the
          following protected grounds: "{caseData.protected_grounds}." The
          applicant’s case has been{' '}
          {caseData.outcome === 'Denied' ? 'denied' : ''}
          {caseData.outcome === 'Terminated' ? 'terminated' : ''}
          {caseData.outcome === 'Granted' ? 'granted' : ''}
          {caseData.outcome === 'Remanded' ? 'remanded' : ''}
          {caseData.outcome === 'Sustained' ? 'sustained' : ''}.
        </p>
      </div>
      <EditCaseDetails
        caseId={caseData.case_id}
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isEditModalVisible}
      />
    </Modal>
  );
};

export default CaseDetails;
