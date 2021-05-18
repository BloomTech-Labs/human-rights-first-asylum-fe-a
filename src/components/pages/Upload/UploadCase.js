import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import UploadCaseForm from './UploadCaseForm';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { notification, Upload, Modal, Button, Spin } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './CaseForm.css';
import './_UploadCase.less';

// Icons for modal
import Icon from '@ant-design/icons';
import UploadCaseBox from '../../../styles/icons/upload-box.svg';
import OrangeLine from '../../../styles/orange-line.svg';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(2),
//       width: '30rem',
//       textAlign: 'center',
//     },
//   },

//   uploadPage: {
//     display: 'flex',
//     padding: '1%',
//     margin: '0 auto',
//     width: '100%',
//     justifyContent: 'flex-end',
//     marginLeft: '-4rem',
//   },

//   pdfUpload: {
//     marginTop: '15%',
//     display: 'flex',
//     marginRight: '7.5%',
//     width: '100%',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },

//   h1Styles: {
//     fontSize: '2rem',
//     marginBottom: '2.5rem',
//   },

//   h2Styles: {
//     fontSize: '1.3rem',
//     marginBottom: '2.5rem',
//     width: '100%',
//   },

//   buttonStyles: {
//     color: '#ffffff',
//     backgroundColor: '#215589',
//     marginTop: '3%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));

// const initialFormValues = {
//   date: '',
//   judge: '',
//   case_outcome: '',
//   country_of_origin: '',
//   protected_grounds: '',
//   application_type: '',
//   case_origin_city: '',
//   case_origin_state: '',
//   gender: '',
//   applicant_language: '',
//   indigenous_group: '',
//   type_of_violence: '',
//   initial_or_appellate: false,
//   filed_in_one_year: false,
//   credible: false,
// };

// This could be removed since it was more relevant with the older design
// const HRFBlueLoader = withStyles(() => ({
//   root: {
//     '& .MuiCircularProgress-circle': {
//       color: '#215589',
//     },
//   },
// }))(CircularProgress);

const UploadCase = ({ authState }) => {
  // const [formValues, setFormValues] = useState(initialFormValues);
  const [formValueQueue, setFormValueQueue] = useState([]);
  // const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { Dragger } = Upload;
  const [postQueue, setPostQueue] = useState([]);
  const [nextPost, setNextPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
    <div className="uploadPage">
      <div className="uploadButton">
        {/* This is a MUI button, we could get rid of this and just use AntD */}

        <Button className="upload-btn" onClick={showModal}>
          {/* <svg
            width="20"
            height="20"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 3L19 12L13 12L13 24L9 24L9 12L3 12L11 3ZM2 4L2 2L20 2L20 4L22 4L22 0L-2.09815e-06 1.9233e-06L-1.74846e-06 4L2 4Z"
              fill="white"
            />
          </svg> */}
          <span>Upload A Case</span>
        </Button>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="footer-btn">
              <Button className="not-now-btn" key="back" onClick={handleCancel}>
                Not Now
              </Button>
              <Button className="review-btn" onClick={handleOk}>
                Review Cases
              </Button>
            </div>,
          ]}
        >
          <div className="pdf-container">
            <div>
              <h1 className="h1Styles">Upload Cases</h1>
              <p className="divider">
                <Icon
                  component={() => <img src={OrangeLine} alt="divider icon" />}
                />
              </p>
            </div>
            <div className="pdfUpload">
              <h2 className="h2Styles">
                Select the PDF case files that you wish to upload.
              </h2>
              <h2 className="h2Styles">
                Once your files have finished uploading, please make any
                necessary corrections to the fields before submitting.
              </h2>
              <form>
                <div className="pdf-upload">
                  <Dragger {...DragProps}>
                    <p className="ant-upload-drag-icon">
                      <Icon
                        component={() => (
                          <img src={UploadCaseBox} alt="uplaod case icon" />
                        )}
                      />
                    </p>
                    <p className="ant-upload-text">
                      Click here or drag files to this area to upload
                    </p>
                  </Dragger>
                  <>
                    {isLoading ? (
                      <div className="spinner_container">
                        <Spin indicator={spinner} />
                      </div>
                    ) : (
                      <p />
                    )}
                  </>
                </div>
              </form>
            </div>
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
