import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};

const AddUsersPage = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;

  const classes = useStyles();

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postNewUser = newUser => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/profile/`, newUser, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
    };
    console.log(newUser);
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
              name="firstName"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.firstName}
            />
          </label>
          <label htmlFor="lastName">
            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.lastName}
            />
          </label>
          <label htmlFor="email">
            <TextField
              id="email"
              label="Email"
              type="text"
              name="email"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.email}
            />
          </label>
          <FormControl>
            <FormLabel className={classes.radio}>Role</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              onChange={onChange}
              value={formValues.role}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="moderator"
                control={<Radio />}
                label="Moderator"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>
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
