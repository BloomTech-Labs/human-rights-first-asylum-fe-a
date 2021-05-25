import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import './_SignupPageStyled.less';
import logo from '../../../styles/hrf-logo.png';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
};

const SignupPage = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewUser = newUser => {
    axiosWithAuth()
      .post(`/profile/pending`, newUser)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
    };
    console.log(newUser);
    postNewUser(newUser);
  };

  return (
    <div className="signup-root">
      <div
        className="background-image-signup"
        aria-label=" cosmetic background image"
      />
      <div className="signup-form">
        <div className="logo">
          <img src={logo} alt="logo" width="350px" />
        </div>
        <h2 className="h2-signup">Register for Access</h2>
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item label="First Name">
            <Input
              id="first_name"
              type="text"
              name="first_name"
              onChange={onChange}
              className="textfield"
              value={formValues.first_name}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              id="last_name"
              type="text"
              name="last_name"
              onChange={onChange}
              className="textfield"
              value={formValues.last_name}
            />
          </Form.Item>
          <Form.Item label="Email Address">
            <Input
              id="email"
              type="text"
              name="email"
              onChange={onChange}
              className="textfield"
              value={formValues.email}
            />
          </Form.Item>
          <div className="submit-button">
            <Button onClick={onSubmit} className="request-btn">
              Request Access
            </Button>
          </div>
          <div className="link-back">
            <p>Already have an account?</p>
            <a className="link" href="/login">
              Log In
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
