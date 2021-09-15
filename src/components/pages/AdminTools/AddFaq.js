import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Form, Input, Button, Modal } from 'antd';

import './_AddFaqStyles.less';

const initialFormValues = {
  question: '',
  answer: '',
};

const AddFaq = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

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
    axiosWithAuth()
      .post(`/faq/`, question)
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
            <div className="divider" />
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
