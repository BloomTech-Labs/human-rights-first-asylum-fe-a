import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  form: {
    width: '50%',
  },
  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },
  h2Styles: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    width: '100%',
  },
  textField: {
    width: '100%',
    margin: '1% auto',
  },
  buttonStyles: {
    color: '#ffffff',
    backgroundColor: '#215589',
    marginTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    margin: '8%',
    fontSize: '1.5rem',
  },
}));

const initialFormValues = {
  question: '',
  answer: '',
};

const EditFaqPage = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/faq/${id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        setFormValues(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken, id]);

  const updateQuestion = editedFaq => {
    axios
      .put(`${process.env.REACT_APP_API_URI}/faq/${id}`, editedFaq, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const editedFaq = {
      question: formValues.question.trim(),
      answer: formValues.answer.trim(),
    };
    updateQuestion(editedFaq);
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h2 className={classes.h1Styles}> Edit Question </h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="question">
            <TextField
              id="question"
              label="Question"
              type="text"
              name="question"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.question}
            />
          </label>
          <label htmlFor="answer">
            <TextField
              id="answer"
              label="Answer"
              type="text"
              name="answer"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.answer}
            />
          </label>
          <div className="submit-button">
            <Button
              onClick={onSubmit}
              className={classes.buttonStyles}
              variant="contained"
              component="span"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqPage;
