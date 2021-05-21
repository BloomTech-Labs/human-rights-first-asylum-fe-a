import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';

import './_FaqStyles.less';

import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const { TextArea } = Input;

const initialFormValues = {
  question: '',
  answer: '',
};

const AddFaq = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;
  const history = useHistory();

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
    history.push('/manage-faq');
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
              <Button onClick={onSubmit} className="add-faq-btn">
                <span>Submit</span>
              </Button>
            </div>,
          ]}
        >
          <Form onSubmit={onSubmit} layout="vertical" className="faq-form">
            <h2 className="h1Styles">Add a FAQ</h2>
            <p className="divider">
              <Icon
                component={() => <img src={OrangeLine} alt="divider icon" />}
              />
            </p>
            <Form.Item label="Question">
              <TextArea
                id="question"
                type="text"
                name="question"
                autoSize={{ minRows: 2, maxRows: 8 }}
                onChange={onChange}
                className="text-field"
                value={formValues.question}
              />
            </Form.Item>
            <Form.Item label="Answer">
              <TextArea
                id="answer"
                type="text"
                name="answer"
                autoSize={{ minRows: 4, maxRows: 10 }}
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
