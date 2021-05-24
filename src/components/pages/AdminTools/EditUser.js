import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useParams, useHistory } from 'react-router-dom';

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

const EditUserPage = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { authState } = props;
  const { id } = useParams();
  const history = useHistory();

  const role = window.localStorage.getItem('role');

  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get(`${process.env.REACT_APP_API_URI}/profiles/${id}`)
      .then(res => {
        setFormValues(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken, id]);

  const editNewUser = editedUser => {
    axiosWithAuth()
      .put(`${process.env.REACT_APP_API_URI}/profile/${id}`, editedUser)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
    history.push('/manage-users');
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const editedUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
    };
    console.log(editedUser);
    editNewUser(editedUser);
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h2 className={classes.h1Styles}> Edit User </h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="firstName">
            <TextField
              id="first_name"
              label="First Name"
              type="text"
              name="first_name"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.first_name || ''}
            />
          </label>
          <label htmlFor="last_name">
            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              name="last_name"
              variant="outlined"
              placeholder="Last Name"
              onChange={onChange}
              className={classes.textField}
              value={formValues.last_name || ''}
            />
          </label>
          <label htmlFor="email">
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              onChange={onChange}
              className={classes.textField}
              value={formValues.email}
            />
          </label>
          {role === 'admin' ? (
            <FormControl>
              <FormLabel className={classes.radio}>Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                onChange={onChange}
                value={formValues.role}
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
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
          ) : null}
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

export default EditUserPage;
