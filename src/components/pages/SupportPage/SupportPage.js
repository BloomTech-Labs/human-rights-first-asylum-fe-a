import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Collapse, Input, Button, Modal, Form } from 'antd';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import './_SupportPageStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const initialFormValues = {
  message: '',
  email: '',
  name: '',
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
      .post(`/faq/contact/`, message, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
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
    alert('Message sent');
    postNewMessage(message);
    setIsModalVisible(false);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`/faq`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        setFaq(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  return (
    <div className="support-container">
      <div className="faq">
        <h2 className="faq-title"> FAQ </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Collapse defaultActiveKey={['0']} accordion>
          {FAQ.map(item => {
            return (
              <Panel key={item.id} header={`${item.question}`}>
                <p className="answer">Answer: </p>
                <span>{item.answer}</span>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="support-form">
        <h2 className="support-header"> Need Additional Assistance? </h2>
        <Button className="support-btn" onClick={showModal}>
          Contact Us
        </Button>
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
            <h2 className="h1Styles">Contact Us:</h2>
            <p className="divider">
              <Icon
                component={() => <img src={OrangeLine} alt="divider icon" />}
              />
            </p>
            <Form.Item label="Message">
              <Input.TextArea
                id="message"
                type="text"
                name="message"
                onChange={onChange}
                className="text-field"
                value={formValues.message}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* <form onSubmit={onSubmit}>
          <label htmlFor="message">

            <Input
              id="message"
              label="Message"
              type="text"
              name="message"
              variant="outlined"
              multiline={true}
              onChange={onChange}
              className="textField"
              value={formValues.message}
            />
          </label>
          <Button
            onClick={onSubmit}
            id="buttonStyles"
            variant="contained"
            component="span"
          >
            Submit
          </Button>
        </form> */}
      </div>
    </div>
  );
};

export default SupportPage;
