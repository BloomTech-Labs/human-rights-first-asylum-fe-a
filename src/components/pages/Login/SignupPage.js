import React from 'react';
import { Form, Input, Button } from 'antd';
import './_SignupPageStyled.less';
import logo from '../../../styles/hrf-logo.png';
import axios from 'axios';
import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const SignupPage = () => {
  const [form] = Form.useForm();

  const successNotification = () => {
    notification.open({
      message: 'Success',
      description: 'Request for membership submitted!',
      top: 128,
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
    });
  };

  const failNotification = () => {
    notification.open({
      message: 'Error',
      description:
        'There was an issue with the signup. Please try again and if the issue persists contact the site administrator.',
      top: 128,
      duration: 8,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    });
  };

  const postNewUser = newUser => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/profile/pending`, newUser)
      .then(() => {
        successNotification();
      })
      .catch(err => {
        failNotification();
      });
    onReset();
  };

  const onFinish = formValues => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
    };
    postNewUser(newUser);
  };

  const onReset = () => {
    form.resetFields();
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
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: 'First Name is required',
              },
              {
                min: 3,
                message: 'First Name must be at least 3 characters',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Last Name is required',
              },
              {
                min: 3,
                message: 'Last Name must be at least 3 characters',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'The input is not a valid email',
              },
              { required: true, message: 'Please input an email' },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <div className="submit-button">
            <Button htmlType="submit" className="request-btn">
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
