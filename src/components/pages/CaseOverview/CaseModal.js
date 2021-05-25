import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button as AntDButton,
  Modal,
  Radio,
  Checkbox,
} from 'antd';
import '../AdminTools/_ManageUsersStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import axiosWithAuth from '../../../utils/axiosWithAuth';
const initialFormValues = {
  hearing_date: '',
  judge_id: '',
  application_type: '',
  protected_grounds: '',
  case_outcome: '',
  country_of_origin: '',
  gender: '',
  type_of_violence: '',
  indigenous_group: '',
  applicant_language: '',
  credible: false,
};
const CaseModal = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isAdmin, setIsAdmin] = useState(false);
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(false);
  const { caseId, setIsEditModalVisible, isEditModalVisible } = props;

  useEffect(() => {
    async function fetchCase() {
      axiosWithAuth()
        .get(`/case/${caseId}`)
        .then(res => {
          setCaseData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setLoading(true);
    fetchCase();
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
    // axiosWithAuth().put(`/case/${caseId}`, formValues);
    console.log(formValues);
    setIsEditModalVisible(false);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const onCheck = e => {
    console.log(formValues.credible);
    setFormValues({ ...formValues, credible: !e.target.checked });
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
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Form.Item label="Hearing Date">
          <Input
            id="hearing_date"
            type="date"
            name="hearing_date"
            onChange={onChange}
            className="text-field"
            value={formValues.hearing_date}
          />
        </Form.Item>
        <Form.Item label="Judge">
          <Input
            id="judge_id"
            type="text"
            name="judge_id"
            onChange={onChange}
            className="text-field"
            placeholder="judge name"
            value={formValues.judge_id}
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
            id="case_outcome"
            type="text"
            name="case_outcome"
            placeholder="Case Outcome"
            onChange={onChange}
            className="text-field"
            value={formValues.case_outcome}
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
        <Form.Item label="Type of Violence">
          <Input
            id="type_of_violence"
            type="text"
            name="type_of_violence"
            placeholder="Type of Violence"
            onChange={onChange}
            className="type_of_violence"
            value={formValues.type_of_violence}
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
          id="credible"
          name="credible"
          value={formValues.credible}
          onClick={onCheck}
        >
          Credible
        </Checkbox>
      </Form>
    </Modal>
  );
};
export default CaseModal;
