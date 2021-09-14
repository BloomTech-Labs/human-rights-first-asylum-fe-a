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
// const initialFormValues = {
//   decision_date: '',
//   application_type: '',
//   protected_grounds: '',
//   outcome: '',
//   country_of_origin: '',
//   case_origin_city: '',
//   case_origin_state: '',
//   gender: '',
//   type_of_persecution: '',
//   indigenous_group: '',
//   applicant_language: '',
//   credibility: false,
// };

const EditCaseDetails = props => {
  const initialFormValues = {
    decision_date: props.caseData.decision_date,
    application_type: props.caseData.application_type,
    protected_grounds: props.caseData.protected_grounds,
    outcome: props.caseData.outcome,
    country_of_origin: props.caseData.country_of_origin,
    case_origin_city: props.caseData.case_origin_city,
    case_origin_state: props.caseData.case_origin_state,
    gender: props.caseData.gender,
    type_of_persecution: props.caseData.type_of_persecution,
    indigenous_group: props.caseData.indigenous_group,
    applicant_language: props.caseData.applicant_language,
    credibility: props.caseData.credibility,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    caseId,
    setIsEditModalVisible,
    isEditModalVisible,
    setCaseData,
  } = props;

  useEffect(() => {
    if (localStorage.role === 'admin') {
      setIsAdmin(true);
    }
    // async function fetchCase() {
    //   axiosWithAuth()
    //     .get(`/cases/${caseId}`)
    //     .then(res => {
    //       console.log(res.data);
    //       setFormValues({
    //         ...res.data,
    //         date: res?.data?.date?.slice(0, 10),
    //       });
    //       setLoading(false);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    setLoading(true);
    // fetchCase();
  }, [caseId]);

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setFormValues(initialFormValues);
  };

  //   console.log('Case Data BEFORE: ', props.caseData);

  const onEditSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/cases/${caseId}`, formValues)
      .then(res => {
        setCaseData(res.data[0]);
        console.log(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
    setIsEditModalVisible(false);
    // console.log('Case Data AFTER: ', props.caseData);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onCheck = e => {
    console.log(formValues.credibility);
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
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
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
