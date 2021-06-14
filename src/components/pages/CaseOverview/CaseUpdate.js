import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Form, Input, Button, Checkbox, DatePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

const CaseUpdate = props => {
  const history = useHistory();
  const { id } = useParams();
  const [judges, setJudges] = useState([]);
  const { authState, caseData } = props;

  useEffect(() => {
    axiosWithAuth()
      .get(`/judges`)
      .then(res => setJudges(res.data))
      .catch(error => console.log(error));
  }, []);

  const onFinish = values => {
    const fieldsValue = {
      ...values,
      hearing_date: values['hearing_date'].format('M-D-YYYY'),
    };

    delete fieldsValue['judge_name']; //judge_name will not send to BE

    const newCase = { ...caseData, ...fieldsValue };
    delete newCase['protected_ground'];
    delete newCase['social_group_type'];
    delete newCase['judge_name'];

    console.log(newCase);
    axiosWithAuth()
      .put(`${process.env.REACT_APP_API_URI}/case/${id}`, fieldsValue)
      .then(res => {
        delete caseData['protected_ground'];
        delete caseData['social_group_type'];

        const newCases = props.casesData.map(c => {
          return c.number === caseData.number
            ? {
                ...caseData,
                ...fieldsValue,
                judge_name: judges.filter(
                  j => fieldsValue['judge'] === j.judge_id
                )[0]['name'],
                id: caseData.number,
              }
            : c;
        });
        props.setCasesData([...newCases]);
        history.push('/'); // or change iseditting to false and set caseData with new values
      })
      .catch(error => console.log(error));
  };

  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 12, span: 16 },
  };

  return (
    <Form
      name="edit"
      onFinish={onFinish}
      initialValues={{
        ...caseData,
        hearing_date: moment(caseData.hearing_date, 'M-D-YYYY'),
      }}
      {...layout}
    >
      <p style={{ textAlign: 'center' }}>
        Case ID: <b>{caseData.case_id}</b>
      </p>
      <Form.Item
        label="Initial"
        name="initial_or_appellate"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      {/*boolean*/}

      <Form.Item label="Hearing Date" name="hearing_date">
        <DatePicker format="M-D-YYYY" />
      </Form.Item>

      <Form.Item label="Judge" name="judge">
        <Select>
          {judges.map(judge => (
            <Option value={judge.judge_id} key={judge.judge_id}>
              {judge.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/*dropdown*/}

      <Form.Item label="Case Origin" name="case_origin">
        <Input />
      </Form.Item>

      <Form.Item label="Application Type" name="application_type">
        {/*might changed to dropdown*/}
        <Input />
      </Form.Item>

      <Form.Item label="Protected Ground" name="protected_ground">
        <Input />
      </Form.Item>

      <Form.Item label="outcome" name="outcome">
        {/*dropdown*/}
        <Select>
          <Option value="Granted">Granted</Option>
          <Option value="Denied">Denied</Option>
          <Option value="Sustained">Sustained</Option>
          <Option value="Remanded">Remanded</Option>
          <Option value="Terminated">Terminated</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Nation of Origin" name="nation_of_origin">
        <Input />
      </Form.Item>

      <Form.Item label="Applicant Gender" name="applicant_gender">
        <Input />
      </Form.Item>

      <Form.Item
        label="Type of Violence Experienced"
        name="type_of_violence_experienced"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Applicant Indigenous Group"
        name="applicant_indigenous_group"
      >
        <Input />
      </Form.Item>

      <Form.Item label="Applicant Language" name="applicant_language">
        <Input />
      </Form.Item>

      <Form.Item
        label="Applicant Access to Interpreter"
        name="applicant_access_to_interpreter"
        valuePropName="checked"
      >
        {/*boolean*/}
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Applicant Perceived Credibility"
        name="applicant_perceived_credibility"
        valuePropName="checked"
      >
        {/*boolean*/}
        <Checkbox />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CaseUpdate;
