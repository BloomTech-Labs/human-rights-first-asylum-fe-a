import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Collapse } from 'antd';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SupportPage.css';

const initialFormValues = {
  message: '',
  email: '',
  name: '',
};

const SupportPage = props => {
  const { Title } = Typography;
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

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewMessage = message => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/faq/contact/`, message, {
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
  };

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
        <Title level={2}> Contact Us </Title>
        <form onSubmit={onSubmit}>
          <label htmlFor="message">
            <TextField
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
        </form>
      </div>
      <div className="faq">
        <Title level={2}> FAQ </Title>
        <Collapse defaultActiveKey={['0']} accordion>
          {FAQ.map(item => {
            return (
              <Panel key={item.id} header={`Q: ${item.question}`}>
                A: {item.answer}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

export default SupportPage;
