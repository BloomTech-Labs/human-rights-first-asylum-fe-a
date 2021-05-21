import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'antd';
import './_ManageFaqStyles.less';

import AddFaq from './AddFaq';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
// const useStyles = makeStyles(theme => ({
//   root: {
//     marginTop: '7%',
//     margin: '5% 0',
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttons: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-start',
//   },
//   p: {
//     margin: '1%',
//   },
//   buttonStyles: {
//     color: '#ffffff',
//     backgroundColor: '#215589',
//     marginTop: '3%',
//     marginLeft: '1%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));

const ManageFaqPage = props => {
  // const { Title } = Typography;
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
      .delete(`${process.env.REACT_APP_API_URI}/faq/${faq.faq_id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        alert(`'Deleted Question: ${faq.question}'`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="root">
      <div className="faq">
        <h2 className="faq-header"> Manage FAQ </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Collapse accordion>
          {faq.map(item => {
            return (
              <Panel className="q-header" header={`${item.question}`}>
                <p className="answer">Answer: </p>
                <span>{item.answer}</span>
                <div className="buttons">
                  <Link to={`edit-faq/${item.faq_id}`}>
                    <Button className="btn-style">Edit</Button>
                  </Link>
                  <Button
                    className="btn-style"
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
      <AddFaq />
    </div>
  );
};

export default ManageFaqPage;
