import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Collapse, Input, Button, Modal, notification, Form } from 'antd';
import './_SupportPageStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import { CheckCircleOutlined } from '@ant-design/icons';
const initialFormValues = {
  message: '',
  email: '',
  name: '',
};
const successNotification = () => {
  notification.open({
    message: 'Contact Us',
    description: 'Message sent successfully!',
    top: 128,
    icon: <CheckCircleOutlined style={{ color: 'green' }} />,
  });
};

const SupportPage = props => {
  const { Panel } = Collapse;
  const { authState, userInfo } = props;
  const [FAQ, setFaq] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    setFormValues({
      ...initialFormValues,
      email: userInfo.email,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
    });
  }, [userInfo]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewMessage = message => {
    axiosWithAuth()
      .post(`/faq/contact/`, message)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const message = {
      message: formValues.message.trim(),
      email: formValues.email.trim(),
      name: formValues.name.trim(),
    };
    successNotification();
    postNewMessage(message);
    setIsModalVisible(false);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`/faq`)
      .then(res => {
        setFaq(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  return (
    <div className="support-container">
      <div className="faqs">
        <h2 className="support-title">Support</h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <h2 className="faq-title"> FAQ </h2>
        <Collapse accordion>
          {FAQ.map(item => {
            return (
              <Panel
                className="q-header"
                key={item.id}
                header={`${item.question}`}
              >
                <p className="answer">Answer: </p>
                <span>{item.answer}</span>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="support-form">
        <div className="contact-btn-div">
          <h2 className="support-header"> Need Additional Assistance? </h2>
          <p className="support-btn" onClick={showModal}>
            Contact Us
          </p>
        </div>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="send-button">
              <Button htmlType="send" className="send-btn" onClick={onSubmit}>
                <span>Send</span>
              </Button>
            </div>,
          ]}
        >
          <Form layout="vertical" className="contact-form" onFinish={onSubmit}>
            <h2 className="h1Styles">Contact Us</h2>
            <p className="divider">
              <Icon
                component={() => <img src={OrangeLine} alt="divider icon" />}
              />
            </p>
            <Form.Item name="message" label="Message">
              <Input.TextArea
                onChange={onChange}
                className="text-field"
                value={formValues.message}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SupportPage;
