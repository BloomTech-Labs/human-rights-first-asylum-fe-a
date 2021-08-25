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
    const { name, value, checked } = e.target;
    if (
      name === 'filed_in_one_year' ||
      name === 'initial_or_appellate' ||
      name === 'credible'
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
    console.log(editedFormValues);
    evt.preventDefault();
    axiosWithAuth()
      .put(`/upload/update/${currentId}`, editedFormValues)
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
          onFinish={handleSubmit(onSubmit)}
        >
          <div>
            <Form.Item label="Decision Date">
              <DatePicker id="hearing-date" />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Case Outcome">
              <Input
                id="outcome"
                type="text"
                name="outcome"
                onChange={onInputChange}
                placeholder="Case Outcome"
                value={editedFormValues.outcome}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Nation of Origin">
              <Input
                id="nation-of-origin"
                type="text"
                name="country_of_origin"
                onChange={onInputChange}
                placeholder="Nation of Origin"
                value={editedFormValues.country_of_origin}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Protected Ground">
              <Input
                id="protected-ground"
                type="text"
                name="protected_grounds"
                onChange={onInputChange}
                placeholder="Protected Ground"
                value={editedFormValues.protected_grounds}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="application-type">
              <Input
                id="application-type"
                type="text"
                name="application_type"
                onChange={onInputChange}
                placeholder="Application Type"
                value={editedFormValues.application_type}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Case Origin City">
              <Input
                id="case-origin-city"
                type="text"
                name="case_origin_city"
                onChange={onInputChange}
                placeholder="Case Origin City"
                value={editedFormValues.case_origin_city}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Case Origin State">
              <Input
                id="case-origin-state"
                type="text"
                name="case_origin_state"
                onChange={onInputChange}
                placeholder="Case Origin State"
                value={editedFormValues.case_origin_state}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Applicant Gender">
              <Input
                id="applicant-gender"
                type="text"
                name="gender"
                onChange={onInputChange}
                placeholder="Applicant Gender"
                value={editedFormValues.gender}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Applicant Language">
              <Input
                id="applicant-language"
                type="text"
                name="applicant_language"
                onChange={onInputChange}
                placeholder="Applicant Language"
                value={editedFormValues.applicant_language}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Applicant Indigenous Group">
              <Input
                id="applicant-indigenous-group"
                type="text"
                name="indigenous_group"
                onChange={onInputChange}
                placeholder="Applicant Indigenous Group"
                value={editedFormValues.indigenous_group}
              />
            </Form.Item>
          </div>
          <div className="type-of-violence-experienced">
            <Form.Item label="Type of Violence Experienced">
              <Input
                id="type-of-violence-experienced"
                type="text"
                name="type_of_violence"
                onChange={onInputChange}
                placeholder="Type of Violence Experienced"
                value={editedFormValues.type_of_violence}
              />
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
              name="credible"
              checked={editedFormValues.credible}
              onChange={onInputChange}
            >
              Applicant is Perceived as Credible
            </Checkbox>
          </div>
          <div className="submit-button">
            <Button className="button-styles" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ReviewCaseForm;
