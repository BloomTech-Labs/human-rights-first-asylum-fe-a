import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';

import './_FaqStyles.less';
import { set } from 'date-fns';

import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const { TextArea } = Input;
// const useStyles = makeStyles(theme => ({
//   root: {
//     marginTop: '7%',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'space-around',
//   },
//   form: {
//     width: '50%',
//   },
//   h1Styles: {
//     fontSize: '2rem',
//     marginBottom: '2.5rem',
//   },
//   h2Styles: {
//     fontSize: '1.3rem',
//     marginBottom: '2.5rem',
//     width: '100%',
//   },
//   textField: {
//     width: '100%',
//     margin: '1% auto',
//   },
//   buttonStyles: {
//     color: '#ffffff',
//     backgroundColor: '#215589',
//     marginTop: '3%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   radio: {
//     margin: '8%',
//     fontSize: '1.5rem',
//   },
// }));

const initialFormValues = {
  question: '',
  answer: '',
};

const AddFaq = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;
  const history = useHistory();

  // My added code for modal
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
              <Button onClick={onSubmit} className="btn-style">
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
