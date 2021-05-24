import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './_SignupPageStyled.less';
import logo from '../../../styles/hrf-logo.png';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const SignupPage = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewUser = newUser => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/profile/pending`, newUser)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
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
        <Form onSubmit={onSubmit} layout="vertical">
          <Form.Item label="First Name">
            <Input
              id="firstname"
              type="text"
              name="firstname"
              onChange={onChange}
              className="textfield"
              value={formValues.firstName}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              id="lastname"
              type="text"
              name="lastname"
              onChange={onChange}
              className="textfield"
              value={formValues.lastName}
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
            <Button onClick={onSubmit} className="buttonStyles">
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
