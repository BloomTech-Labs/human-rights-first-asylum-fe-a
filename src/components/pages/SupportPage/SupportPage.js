import React from 'react';
import { Button, Typography, Form, Input, Collapse } from 'antd';
import './SupportPage.css';

const { Panel } = Collapse;

const SupportPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div className="supportRoot">
      <div className="form">
        <Form className="contactForm">
          <Title level={2}> Contact Us </Title>
          <Form.Item
            label="Message"
            name="Message"
            rules={[
              {
                required: true,
                message: 'Please input a message',
              },
            ]}
          >
            <Input className="textField" placeholder="Message" />
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
        <Collapse>
          <Panel header={'Q: How do I upload a case?'}>
            A: Please navigate to the "Upload Case" page via the menu to the
            left of your screen to upload your case files. Once your files are
            succesfully uploaded, our system will comb through them and extract
            the necessary information to then populate the form to the right of
            the screen on the case upload page for your final approval before
            completing your submission.
          </Panel>
          <Panel header={'Q: Where does your data come from?'}>
            A: We aggregate data that you, the user, provide. We scrape the data
            from case files asylum attorneys upload from all over the country
            and display it for you in a neat, easily digestable package.
          </Panel>
          <Panel header={'Q: How often is the data updated?'}>
            A: The data is updated with every new case file uploaded which is
            vetted before being added to the database.
          </Panel>
          <Panel
            header={
              'Q: I know other attorneys that could benefit from this application, how can they gain access?'
            }
          >
            A: Currently the application invite only, please contact the
            administrator in order to invite fellow attorneys.
          </Panel>
          <Panel header={'Q: How secure is your application?'}>
            A: Both incoming data and new users are vetted manually by an
            administrator ensuring that both the data and user base remain
            reliable.
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SupportPage;

// <Title level={4}>Q: How do I upload a case?</Title>
// <Paragraph>
//   A: Please navigate to the "Upload Case" page via the menu to the left
//   of your screen to upload your case files. Once your files are
//   succesfully uploaded, our system will comb through them and extract
//   the necessary information to then populate the form to the right of
//   the screen on the case upload page for your final approval before
//   completing your submission.
// </Paragraph>
