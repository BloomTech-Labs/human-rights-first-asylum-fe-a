import React, { useState, useEffect } from 'react';
import { Form, Input, Button as AntDButton, Modal, Checkbox } from 'antd';
import '../AdminTools/_ManageUsersStyles.less';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const EditCaseDetails = props => {
  const {
    caseId,
    setIsEditModalVisible,
    isEditModalVisible,
    setCaseData,
    caseData,
    setHasUpdated,
  } = props;

  const initialFormValues = {
    decision_date: caseData.decision_date,
    application_type: caseData.application_type,
    protected_grounds: caseData.protected_grounds,
    outcome: caseData.outcome,
    country_of_origin: caseData.country_of_origin,
    case_origin_city: caseData.case_origin_city,
    case_origin_state: caseData.case_origin_state,
    gender: caseData.gender,
    type_of_persecution: caseData.type_of_persecution,
    indigenous_group: caseData.indigenous_group,
    applicant_language: caseData.applicant_language,
    credibility: caseData.credibility,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.role === 'admin') {
      setIsAdmin(true);
    }
    setFormValues(initialFormValues);
    setLoading(true);
  }, [caseId]);

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setFormValues(initialFormValues);
  };

  const onEditSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/cases/${caseId}`, formValues)
      .then(res => {
        setCaseData({
          ...res.data[0],
          first_name: caseData.first_name,
          middle_initial: caseData.middle_initial,
          last_name: caseData.last_name,
        });
        setHasUpdated(true);
      })
      .catch(err => {
        console.log(err);
      });
    setIsEditModalVisible(false);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onCheck = e => {
    setFormValues({ ...formValues, credibility: !e.target.checked });
  };

  return (
    <Modal
      title=""
      visible={isEditModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
      footer={[
        <div className="submit-button">
          <AntDButton
            htmlType="submit"
            className="add-user-btn"
            onClick={onEditSubmit}
          >
            <span>Submit</span>
          </AntDButton>
        </div>,
      ]}
    >
      <Form layout="vertical" className="user-form" onFinish={onEditSubmit}>
        <h2 className="h1Styles">Edit Case Details</h2>
        <div className="divider" />
        <Form.Item label="Case Date">
          <Input
            id="date"
            type="date"
            name="date"
            onChange={onChange}
            className="text-field"
            value={formValues.date}
          />
        </Form.Item>
        <Form.Item label="Application Type">
          <Input
            id="application_type"
            type="text"
            name="application_type"
            placeholder="Application Type"
            onChange={onChange}
            className="text-field"
            value={formValues.application_type}
          />
        </Form.Item>
        <Form.Item label="Protected Ground">
          <Input
            id="protected_grounds"
            type="text"
            name="protected_grounds"
            placeholder="Protected Ground"
            onChange={onChange}
            className="text-field"
            value={formValues.protected_grounds}
          />
        </Form.Item>
        <Form.Item label="Case Outcome">
          <Input
            id="outcome"
            type="text"
            name="outcome"
            placeholder="Case Outcome"
            onChange={onChange}
            className="text-field"
            value={formValues.outcome}
          />
        </Form.Item>
        <Form.Item label="Country of Origin">
          <Input
            id="country_of_origin"
            type="text"
            name="country_of_origin"
            placeholder="Country of Origin"
            onChange={onChange}
            className="text-field"
            value={formValues.country_of_origin}
          />
        </Form.Item>
        <Form.Item label="Case Origin City">
          <Input
            id="case_origin_city"
            type="text"
            name="case_origin_city"
            placeholder="Case Origin City"
            onChange={onChange}
            className="text-field"
            value={formValues.case_origin_city}
          />
        </Form.Item>
        <Form.Item label="Case Origin State">
          <Input
            id="case_origin_state"
            type="text"
            name="case_origin_state"
            placeholder="Case Origin State"
            onChange={onChange}
            className="text-field"
            value={formValues.case_origin_state}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Input
            id="gender"
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={onChange}
            className="text-field"
            value={formValues.gender}
          />
        </Form.Item>
        <Form.Item label="Type of Persecution">
          <Input
            id="type_of_persecution"
            type="text"
            name="type_of_persecution"
            placeholder="Type of Persecution"
            onChange={onChange}
            className="type_of_persecution"
            value={formValues.type_of_persecution}
          />
        </Form.Item>
        <Form.Item label="Indigenous Group">
          <Input
            id="indigenous_group"
            type="text"
            name="indigenous_group"
            placeholder="Indigenous Group"
            onChange={onChange}
            className="indigenous_group"
            value={formValues.indigenous_group}
          />
        </Form.Item>
        <Form.Item label="Applicant Language">
          <Input
            id="applicant_language"
            type="text"
            name="applicant_language"
            placeholder="Applicant Language"
            onChange={onChange}
            className="applicant_language"
            value={formValues.applicant_language}
          />
        </Form.Item>
        <Checkbox
          id="credibility"
          name="credibility"
          checked={formValues.credibility}
          onClick={onCheck}
        >
          Credibility
        </Checkbox>
      </Form>
    </Modal>
  );
};
export default EditCaseDetails;
