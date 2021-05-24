import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal } from 'antd';

import './_AddFaqStyles.less';

import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const initialFormValues = {
  question: '',
  answer: '',
};

const AddFaq = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;
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

  const postNewQuestion = question => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/faq/`, question, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const question = {
      question: formValues.question.trim(),
      answer: formValues.answer.trim(),
    };
    postNewQuestion(question);
    setIsModalVisible(false);
  };

  return (
    <div className="root">
      <div className="add-faq-btn-container">
        <Button className="add-faq-btn" onClick={showModal}>
          Add a FAQ
        </Button>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="submit-button">
              <Button
                htmlType="submit"
                className="add-faq-btn"
                onClick={onSubmit}
              >
                <span>Submit</span>
              </Button>
            </div>,
          ]}
        >
          <Form layout="vertical" className="faq-form" onFinish={onSubmit}>
            <h2 className="h1Styles">Add a FAQ</h2>
            <p className="divider">
              <Icon
                component={() => <img src={OrangeLine} alt="divider icon" />}
              />
            </p>
            <Form.Item label="Question">
              <Input
                id="question"
                type="text"
                name="question"
                onChange={onChange}
                className="text-field"
                value={formValues.question}
              />
            </Form.Item>
            <Form.Item label="Answer">
              <Input
                id="answer"
                type="text"
                name="answer"
                onChange={onChange}
                className="text-field"
                value={formValues.answer}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AddFaq;
