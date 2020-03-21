import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import config from '../../Config';

const RewardEditor = (props) => {

  const [uploadedFile, setUploadedFile] = useState('');

  const onImageDrop = (files) => {
    setUploadedFile(files[0]);
    handleImageUpload(files[0]);
  }

  const handleImageUpload = (file) => {
    let upload = request.post(config.uploadURL)
                        .field('upload_preset', config.uploadPreset )
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  return (
  <div id = "reward-editor">
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={onImageDrop}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  </div>
  );
}

export default RewardEditor;