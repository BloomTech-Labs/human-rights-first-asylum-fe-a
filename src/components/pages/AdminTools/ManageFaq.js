import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import { Form, Input, Button as AntDButton, Modal, Collapse } from 'antd';

// Styling and Icons
import './_AddFaqStyles.less';
import './_ManageFaqStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const initialFormValues = {
  question: '',
  answer: '',
};
const ManageFaqPage = props => {
  const { Panel } = Collapse;
  const { authState } = props;
  const [faq, setFaq] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

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

  const deleteFaq = faq => {
    axiosWithAuth()
      .delete(`/faq/${faq.faq_id}`)
      .then(res => {
        alert(`'Deleted Question: ${faq.question}'`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      .then(res => {
        setFormValues(initialFormValues);
        window.location.reload();
      })
      .catch(err => console.log(err));
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
      <div className="faq">
        <h2 className="faq-header"> Manage FAQ </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Collapse accordion>
          {faq.map(item => {
            return (
              <Panel className="q-header" header={`${item.question}`}>
                <p className="answer">Answer: </p>
                <span>{item.answer}</span>
                <div className="buttons">
                  <Link to={`edit-faq/${item.faq_id}`}>
                    <AntDButton className="btn-style">Edit</AntDButton>
                  </Link>
                  <AntDButton
                    className="btn-style"
                    onClick={() => {
                      deleteFaq(item);
                    }}
                  >
                    Delete
                  </AntDButton>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="add-faq-btn-container">
        <AntDButton className="add-faq-btn" onClick={showModal}>
          Add a FAQ
        </AntDButton>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="submit-button">
              <AntDButton
                htmlType="submit"
                className="add-faq-btn"
                onClick={onSubmit}
              >
                <span>Submit</span>
              </AntDButton>
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
export default ManageFaqPage;
