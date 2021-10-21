import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { notification, Upload, Button, Spin } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './_UploadCase.less';

// Icons for modal
import Icon from '@ant-design/icons';
import UploadCaseBox from '../../../styles/icons/upload-box.svg';

const HomePageUpload = ({ getPendingCases }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { Dragger } = Upload;
  const [postQueue, setPostQueue] = useState([]);
  const [nextPost, setNextPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrapQueue, setScrapQueue] = useState([]);
  const [nextScrap, setNextScrap] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const successNotification = () => {
    getPendingCases();
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
    // let multiFile = [];
    // for (let i = 0; i < e.length; i++) {
    //   let dataForm = new FormData();
    //   dataForm.append('target_file', e[i]);
    //   multiFile.push(dataForm);
    // }
    // setPostQueue([...postQueue, ...multiFile]);
    let file = e.pop();
    if (file) {
      setIsLoading(true);
      const fd = new FormData();
      fd.append('image', file, file.name);
      axiosWithAuth()
        .post('/upload', fd)
        .then(res => console.log(res.data.imageURL))
        .then(() => onFileChange(e));
    } else {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push('/my-cases');
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
  return (
    <div className="uploadPage">
      <div
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div key="footer" className="footer-btn">
            <Button className="not-now-btn" key="back" onClick={handleCancel}>
              Not Now
            </Button>
            <Button className="review-btn" key="review" onClick={handleOk}>
              Review Cases
            </Button>
          </div>,
        ]}
      >
        <div className="Home-pdf-container">
          <div>
            <h1 className="uploadh1">Upload a Case</h1>
          </div>
          <div className="pdfUpload">
            <h2 className="h2Styles">
              Select the PDF case files that you wish to upload.
            </h2>
            <h2 className="h2Styles">
              Once your files have finished uploading, please make any necessary
              corrections to the fields before submitting.
            </h2>
            <form>
              <div className="pdf-upload">
                <Dragger {...DragProps} className="Dragger">
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
      </div>
    </div>
  );
};

export default HomePageUpload;
