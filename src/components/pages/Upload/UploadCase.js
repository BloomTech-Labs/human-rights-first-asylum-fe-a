import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { sendPdf, getData } from '../.././../state/actions/index';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30rem',
      textAlign: 'center',
    },
  },
}));

const initialFormValues = {
  case_url: '',
  court_type: '',
  hearing_type: '',
  nation_of_origin: '',
  case_origin: '',
  hearing_date: '',
  decision_date: '',
  credibility_of_refugee: '',
  case_status: '',
  case_outcome: '',
  judge_name: '',
  protected_ground: [],
  application_type : [],
};

const UploadCase = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const classes = useStyles();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [approvedQueue, setApprovedQueue] = useState([]);
  const { id } = useParams();

  const adminData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profile/${id}`)
      .then(res => {
        console.log(res.data);
        setIsAdmin(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const userData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profile/${id}`)
      .then(res => {
        console.log(res.data);
        setIsUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const approvedCases = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/manage/all`)
      .then(res => {
        console.log(res.data);
        setApprovedQueue(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const acceptCase = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/manage/approve`)
      .then(res => {
        console.log(res.data);
        setIsApproved(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const rejectCase = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/manage/reject`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const divStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '190vh',
    width: '100%',
  };

  const h1Styles = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#215589',
  };

  const buttonStyles = {
    color: '#ffffff',
    backgroundColor: '#BC541E',
  };

  const { handleSubmit, errors } = useForm();
  // const onSubmit = data => console.log(data);

  // useEffect(()=>{
  //   props.getData();
  // },[])
  const onSubmit = () => {};
  const onFileChange = e => {
    // const file = e.target.files[0];
    // props.sendPdf(file)
    // props.getData()
  };
  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleAdminTasks = () => {
  //   this.setState({isAdmin: true});
  // };

  // const handleUserTasks = () => {
  //   this.setState({isAdmin: false});
  // };

  return (
    <div style={divStyles}>
      <div className={classes.root}>
        <div className="form-header">
          <h1 style={h1Styles}>Upload a New Case</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pdf-upload">
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                onChange={onFileChange}
              />
              <Button
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Upload a case
              </Button>
            </label>
          </div>
          <div className="hearing-date">
            <label htmlFor="hearing-date">
              <TextField
                id="hearing-date"
                label="Hearing Date"
                type="date"
                variant="outlined"
                defaultValue="2021-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </label>
          </div>
          <div className="decision-date">
            <label htmlFor="decision-date">
              <TextField
                id="decision-date"
                label="Decision Date"
                type="date"
                variant="outlined"
                defaultValue="2021-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </label>
          </div>
          <div className="court-type">
            <label htmlFor="court-type">
              {formValues.course_type}
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Court Type"
                name="Court Type"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="hearing-type">
            <label htmlFor="hearing-type">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Hearing Type"
                name="Hearing Type"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="refugee-origin">
            <label htmlFor="refugee-origin">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Nation of Origin"
                name="Nation of Origin"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="protected-ground">
            <label htmlFor="protected-ground">
              <TextField
                multiline={true}
                variant="outlined"
                name="Protected Ground"
                placeholder="Protected Ground"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="social-group">
            <label htmlFor="social-group">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Application Type "
                name="Application Type "
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="location">
            <label htmlFor="location">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Location"
                name="Location"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="refugee-credibility">
            <label htmlFor="refugee-credibility">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Applicant Perceived Credibility"
                name="Applicant Perceived Credibility"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="judge-name">
            <label htmlFor="judge-name">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Judge"
                name="Judge"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="decision">
            <label htmlFor="decision">
              <TextField
                multiline={true}
                variant="outlined"
                placeholder="Decision"
                name="Decision"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div className="case-status">
            <label htmlFor="case-status">
              <TextField
                multiline={true}
                variant="outlined"
                placeholder="Case Status"
                name="Case Status"
                onChange={onInputChange}
              />
            </label>
          </div>
          {userData && (
            <>
              <div className="submit-button">
                <Button
                  className="btn-upload"
                  style={buttonStyles}
                  variant="contained"
                  component="span"
                >
                  Submit
                </Button>
              </div>
            </>
          )}
          <br />

          {adminData && (
            <>
              <div className="approve-button">
                <Button
                  onClick={acceptCase}
                  className="btn-upload"
                  style={buttonStyles}
                  variant="contained"
                  component="span"
                >
                  Approve
                </Button>
              </div>
              <br />
              <div className="reject-button">
                <Button
                  onClick={rejectCase}
                  className="btn-upload"
                  style={buttonStyles}
                  variant="contained"
                  component="span"
                >
                  Reject
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  console.log(state);
  return {
    isLoading: state.isLoading,
    pdfData: state.pdfData,
  };
};

export default connect(mapStateToProps, { getData, sendPdf })(UploadCase);
