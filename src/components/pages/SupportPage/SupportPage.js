import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Form, Input, Collapse } from 'antd';
import './SupportPage.css';

const SupportPage = props => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const { authState } = props;

  const [FAQ, setFaq] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/faq`, {
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
    <div className="supportRoot">
      <div className="form">
        <Form className="contactForm">
          <Title level={2}> Contact Us </Title>
          <Form.Item
            label="How can we help?"
            name="Message"
            rules={[
              {
                required: true,
                message: 'Please input a message',
              },
            ]}
          >
            <TextArea className="textField" placeholder="Message" autoSize />
          </Form.Item>
          <Form.Item>
            <Button className="formBtn" type="primary" htmlType="submit">
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="faq">
        <Title level={2}> FAQ </Title>
        <Collapse defaultActiveKey={['0']} accordion>
          {FAQ.map(item => {
            return (
              <Panel header={`Q: ${item.question}`}>A: {item.answer}</Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

export default SupportPage;
