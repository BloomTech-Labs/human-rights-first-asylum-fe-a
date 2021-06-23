import React, { useState } from 'react';
import { Button as AntDButton, Modal } from 'antd';
import '../AdminTools/_ManageUsersStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import EditCaseDetails from '../CaseOverview/EditCaseDetails';

const CaseDetails = props => {
  const { caseData, isDetailsVisible, setIsDetailsVisible } = props;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

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
      <p className="divider">
        <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
      </p>
      <div>
        <p>{`Case Date: ${caseData.date}`}</p>
        <p>{`Judge Name: ${caseData.first_name} ${caseData.middle_initial}. ${caseData.last_name}`}</p>
        <p>{`Origin City: ${caseData.case_origin_city}`}</p>
        <p>{`Origin State: ${caseData.case_origin_state}`}</p>
        <p>{`Gender: ${caseData.gender}`}</p>
        <p>{`Type of Violence: ${caseData.type_of_violence}`}</p>
        <p>{`Indigenous Group: ${caseData.indigenous_group}`}</p>
        <p>{`Protected Grounds: ${caseData.protected_grounds}`}</p>
        <p>{`Outcome: ${caseData.outcome}`}</p>
        <p>{`Country of Origin: ${caseData.country_of_origin}`}</p>
        <p>{`Filed Within One Year: ${caseData.filed_in_one_year}`}</p>
        <p>{`Applicant Language: ${caseData.applicant_language}`}</p>
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
