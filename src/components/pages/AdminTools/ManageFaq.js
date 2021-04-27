import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    margin: '5% 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },
  faq: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    margin: '1%',
  },
}));

const ManageFaqPage = props => {
  const { authState } = props;
  const [faq, setFaq] = useState([]);

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

  const deleteFaq = faq => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/faq/${faq.id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        alert(`${faq.question}'s FAQ was deleted`);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.h1Styles}>Manage FAQ</h1>
      <div>
        {faq.map(faq => (
          <div className={classes.faq}>
            <p className={classes.p}>
              {' '}
              <strong>Question:</strong> {faq.question}
            </p>
            <p className={classes.p}>
              {' '}
              <strong>Answer:</strong> {faq.answer}
            </p>
            <Link to={`edit-faq/${faq.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={() => {
                deleteFaq(faq);
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFaqPage;
