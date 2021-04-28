import React from 'react';
import { Button, Typography, Form, Input, Collapse } from 'antd';
import './SupportPage.css';

const FAQ = [
  {
    question: 'How do I upload a case?',
    answer:
      'Please navigate to the "Upload Case" page via the menu to the left of your screen to upload your case files. Once your files are succesfully uploaded, our system will comb through them and extract the necessary information to then populate the form to the right of the screen on the case upload page for your final approval before completing your submission.',
  },
  {
    question: 'Where does your data come from?',
    answer:
      'We aggregate data that you, the user, provide. We scrape the data from case files asylum attorneys upload from all over the country and display it for you in a neat, easily digestable package.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'The data is updated with every new case file uploaded which is vetted before being added to the database.',
  },
  {
    question:
      'I know other attorneys that could benefit from this application, how can they gain access?',
    answer:
      'Currently, the application is invite only. Please contact the administrator in order to invite fellow attorneys.',
  },
  {
    question: 'How secure is your application?',
    answer:
      'Both incoming data and new users are vetted manually by an administrator ensuring that both the data and user base remain reliable.',
  },
];

const SupportPage = () => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { TextArea } = Input;

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
            <Button id="formBtn" type="primary" htmlType="submit">
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
