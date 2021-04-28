import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography, Collapse } from 'antd';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    margin: '5% 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  p: {
    margin: '1%',
  },
  buttonStyles: {
    color: '#ffffff',
    backgroundColor: '#215589',
    marginTop: '3%',
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ManageFaqPage = props => {
  const { Title } = Typography;
  const { Panel } = Collapse;
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
      <div className="faq">
        <Title level={2}> Manage FAQ </Title>
        <Collapse defaultActiveKey={['0']} accordion>
          {faq.map(item => {
            return (
              <Panel header={`Q: ${item.question}`}>
                A: {item.answer}
                <div className={classes.buttons}>
                  <Link to={`edit-faq/${item.id}`}>
                    <Button className={classes.buttonStyles}>Edit</Button>
                  </Link>
                  <Button
                    className={classes.buttonStyles}
                    onClick={() => {
                      deleteFaq(item);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

export default ManageFaqPage;
