import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
}));

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  login: '',
  password: '',
};

const AddUsersPage = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const classes = useStyles();

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewUser = newUser => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/newUser/`, newUser)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      profile: {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim(),
        login: formValues.login.trim(),
      },
      credentials: {
        password: {
          value: formValues.password.trim(),
        },
      },
    };
    postNewUser(newUser);
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h2 className={classes.h1Styles}> Add User </h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="firstName">
            <TextField
              id="firstName"
              label="First Name"
              type="text"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
            />
          </label>
          <label htmlFor="lastName">
            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
            />
          </label>
          <label htmlFor="email">
            <TextField
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
            />
          </label>
          <label htmlFor="login">
            <TextField
              id="login"
              label="Login"
              type="text"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
            />
          </label>
          <label htmlFor="password">
            <TextField
              id="password"
              label="Password"
              type="text"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
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

export default AddUsersPage;
