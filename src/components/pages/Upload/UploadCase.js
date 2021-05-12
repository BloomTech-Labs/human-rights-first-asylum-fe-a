import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import UploadCaseForm from './UploadCaseForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { notification, Upload, Modal } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import './CaseForm.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30rem',
      textAlign: 'center',
    },
  },

  uploadPage: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    padding: '1%',
    margin: '0 auto',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  leftDiv: {
    marginTop: '15%',
    width: '35%',
    display: 'inline-block',
    padding: '1%',
  },

  pdfUpload: {
    marginTop: '15%',
    display: 'flex',
    marginRight: '7.5%',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
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
  date: '',
  judge: '',
  case_outcome: '',
  country_of_origin: '',
  protected_grounds: '',
  application_type: '',
  case_origin_city: '',
  case_origin_state: '',
  gender: '',
  applicant_language: '',
  indigenous_group: '',
  type_of_violence: '',
  initial_or_appellate: false,
  filed_in_one_year: false,
  credible: false,
};

const HRFBlueLoader = withStyles(() => ({
  root: {
    '& .MuiCircularProgress-circle': {
      color: '#215589',
    },
  },
}))(CircularProgress);

const UploadCase = ({ authState }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formValueQueue, setFormValueQueue] = useState([]);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { Dragger } = Upload;
  const [postQueue, setPostQueue] = useState([]);
  const [nextPost, setNextPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const successNotification = () => {
    notification.open({
      message: 'Upload Status',
      description: 'Case uploaded successfully!',
      top: 128,
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
    });
  };

  const failNotification = () => {
    notification.open({
      message: 'Upload Status',
      description:
        'There was an issue with the upload. Please try again and if the issue persists contact the site administrator.',
      top: 128,
      duration: 8,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    });
  };

  const onFileChange = e => {
    let multiFile = [];
    for (let i = 0; i < e.length; i++) {
      let dataForm = new FormData();
      dataForm.append('target_file', e[i]);
      setIsLoading(true);
      multiFile.push(dataForm);
    }
    setPostQueue([...postQueue, ...multiFile]);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const DragProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf',
    progress: false,
    fileList: [],
    beforeUpload: (file, fileList) => {
      onFileChange(fileList);
    },
  };
  // Might need this later depending on design changes
  // const onInputChange = e => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };
  useEffect(() => {
    if (!nextPost && postQueue.length !== 0) {
      console.log('test', postQueue, !nextPost);
      const copy = postQueue;
      setNextPost(copy.shift());
      setPostQueue(copy);
      console.log(postQueue, nextPost);
    }
  }, [postQueue]);
  useEffect(() => {
    if (nextPost) {
      axios
        .post(`${process.env.REACT_APP_API_URI}/upload`, nextPost, {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        })
        .then(res => {
          setFormValueQueue([...formValueQueue, res.data]);
          setIsLoading(false);
          setIsEditing(true);
          successNotification();
          setNextPost(null);
          if (postQueue) {
            const copy = postQueue;
            setNextPost(copy.shift());
            setPostQueue(copy);
          }
        })
        .catch(() => {
          setIsLoading(false);
          failNotification();
        });
    }
  }, [nextPost]);
  // Might need this later depending on design changes
  // useEffect(() => {
  //   if (formValueQueue && isEditing) {
  //     let nextForm = formValueQueue[0];
  //     let currentForm = formValues;
  //     for (const values in nextForm) {
  //       if (values in currentForm) {
  //         if (nextForm[values] === null) {
  //           currentForm[values] = '';
  //         } else {
  //           currentForm[values] = nextForm[values];
  //         }
  //       }
  //     }
  //     setFormValues(currentForm);
  //   }
  // }, [formValueQueue]);

  return (
    <div className={classes.uploadPage}>
      <div className={classes.leftDiv}>
        <Button
          className={classes.buttonStyles}
          variant="outlined"
          component="span"
          onClick={showModal}
        >
          Upload A Case
        </Button>
        <Modal
          title="Upload Files"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={classes.pdfUpload}>
            <h1 className={classes.h1Styles}>The Case Uploader</h1>
            <h2 className={classes.h2Styles}>
              Select a case PDF to upload. Once the case finishes uploading,
              please make any necessary corrections before submitting.
            </h2>
            <form>
              <div className="pdf-upload">
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    multiple
                    onChange={e => {
                      onFileChange(e.target.files);
                    }}
                  />
                  <Button
                    className={classes.buttonStyles}
                    variant="outlined"
                    component="span"
                  >
                    <p className="button-text">Select case file</p>
                  </Button>
                </label>
                <Dragger {...DragProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Drag files to this area to upload
                  </p>
                </Dragger>
                <>
                  {isLoading ? (
                    <div className="spinner_container">
                      <HRFBlueLoader />
                    </div>
                  ) : (
                    <p />
                  )}
                </>
              </div>
            </form>
          </div>
          {
            // Might need this later depending on design changes
            /* <UploadCaseForm
        formValues={formValues}
        onInputChange={onInputChange}
        formValueQueue={formValueQueue}
      /> */
          }
        </Modal>
      </div>
    </div>
  );
};
export default UploadCase;
