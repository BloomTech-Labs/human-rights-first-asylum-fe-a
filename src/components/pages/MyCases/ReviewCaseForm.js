import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ReviewCaseForm.less';
import { Form, Input, DatePicker, Checkbox, Button } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const ReviewCaseForm = props => {
  const {
    formValues,
    currentId,
    getPendingCases,
    setVisible,
    isVisible,
  } = props;
  const [editedFormValues, setEditedFormValues] = useState(formValues);
  useEffect(() => {
    setEditedFormValues(formValues);
  }, [formValues, isVisible]);
  const onInputChange = e => {
    console.log(formValues);
    const { name, value, checked } = e.target;
    if (
      name === 'filed_in_one_year' ||
      name === 'initial_or_appellate' ||
      name === 'credibility'
    ) {
      setEditedFormValues({ ...editedFormValues, [name]: checked });
    } else {
      setEditedFormValues({ ...editedFormValues, [name]: value });
    }
  };
  const role = window.localStorage.getItem('role_name');
  const { handleSubmit } = useForm();
  const onSubmit = evt => {
    delete editedFormValues.id;
    axiosWithAuth()
      .put(`/cases/update/${currentId}`, editedFormValues)
      .then(res => {
        getPendingCases();
        setVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="uploadPage">
      <div className="editForm">
        <Form
          layout="vertical"
          className="user-form"
          onFinish={onSubmit}
          initialValues={{
            outcome: editedFormValues.outcome,
            country_of_origin: editedFormValues.country_of_origin,
            protected_grounds: editedFormValues.protected_grounds,
            applicant_language: editedFormValues.applicant_language,
            application_type: editedFormValues.application_type,
            case_origin_city: editedFormValues.case_origin_city,
            case_origin_state: editedFormValues.case_origin_state,
            gender: editedFormValues.gender,
            indigenous_group: editedFormValues.indigenous_group,
            type_of_persecution: editedFormValues.type_of_persecution,
            initial_or_appellate: editedFormValues.initial_or_appellate,
            filed_in_one_year: editedFormValues.filed_in_one_year,
            credibility: editedFormValues.credibility,
          }}
        >
          <div>
            <Form.Item label="Decision Date" name="date">
              <DatePicker id="hearing-date" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Case Outcome"
              id="outcome"
              type="text"
              name="outcome"
              onChange={onInputChange}
              placeholder="Case Outcome"
              value={editedFormValues.outcome}
              rules={[
                {
                  required: true,
                  message: 'Please input Case Outcome!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Nation of Origin"
              id="nation-of-origin"
              type="text"
              name="country_of_origin"
              onChange={onInputChange}
              placeholder="Nation of Origin"
              value={editedFormValues.country_of_origin}
              rules={[
                {
                  required: true,
                  message: 'Please input Nation of Origin!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Protected Ground"
              rules={[
                {
                  required: true,
                  message: 'Please input Protected Ground!',
                },
              ]}
              id="protected-ground"
              type="text"
              name="protected_grounds"
              onChange={onInputChange}
              placeholder="Protected Ground"
              value={editedFormValues.protected_grounds}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="application-type"
              rules={[
                {
                  required: true,
                  message: 'Please input application-type!',
                },
              ]}
              id="application-type"
              type="text"
              name="application_type"
              onChange={onInputChange}
              placeholder="Application Type"
              value={editedFormValues.application_type}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Case Origin City"
              id="case-origin-city"
              type="text"
              name="case_origin_city"
              onChange={onInputChange}
              placeholder="Case Origin City"
              value={editedFormValues.case_origin_city}
              rules={[
                {
                  required: true,
                  message: 'Please input Case Origin City',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Case Origin State"
              id="case-origin-state"
              type="text"
              name="case_origin_state"
              onChange={onInputChange}
              placeholder="Case Origin State"
              value={editedFormValues.case_origin_state}
              rules={[
                {
                  required: true,
                  message: 'Please input Case Origin State',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Applicant Gender"
              id="applicant-gender"
              type="text"
              name="gender"
              onChange={onInputChange}
              placeholder="Applicant Gender"
              value={editedFormValues.gender}
              rules={[
                {
                  required: true,
                  message: 'Please input Applicant Gender',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Applicant Language"
              id="applicant-language"
              type="text"
              name="applicant_language"
              onChange={onInputChange}
              placeholder="Applicant Language"
              value={editedFormValues.applicant_language}
              rules={[
                {
                  required: true,
                  message: 'Please input Applicant Language',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Applicant Indigenous Group"
              id="applicant-indigenous-group"
              type="text"
              name="indigenous_group"
              onChange={onInputChange}
              placeholder="Applicant Indigenous Group"
              value={editedFormValues.indigenous_group}
              rules={[
                {
                  required: true,
                  message: 'Please input Indigenous Group',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="type-of-violence-experienced">
            <Form.Item
              label="Type of Persecution Experienced"
              id="type-of-violence-experienced"
              type="text"
              name="type_of_persecution"
              onChange={onInputChange}
              placeholder="Type of Persecution Experienced"
              value={editedFormValues.type_of_persecution}
              rules={[
                {
                  required: true,
                  message: 'Please input Type of Persecution Experienced',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="checkbox">
            <Checkbox
              name="initial_or_appellate"
              checked={editedFormValues.initial_or_appellate}
              onChange={onInputChange}
            >
              Appellate Case
            </Checkbox>
          </div>
          <div className="checkbox">
            <Checkbox
              name="filed_in_one_year"
              checked={editedFormValues.filed_in_one_year}
              onChange={onInputChange}
            >
              Case was filed Within One Year
            </Checkbox>
          </div>
          <div className="checkbox">
            <Checkbox
              name="credibility"
              checked={editedFormValues.credibility}
              onChange={onInputChange}
            >
              Applicant is Perceived as credibility
            </Checkbox>
          </div>
          <div className="submit-button">
            <Button className="button-styles" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ReviewCaseForm;
