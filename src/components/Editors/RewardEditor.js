import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import config from '../../Config';

const RewardEditor = (props) => {

  const [rewardIcon, setRewardIcon] = useState(props.reward.icon);
  const [rewardName, setRewardName] = useState(props.reward.name);
  const [rewardLevel, setRewardLevel] = useState(props.reward.level);
  const [uploadedFile, setUploadedFile] = useState('');
  const [fileURL, setFileURL] = useState('');

  const onImageDrop = (files) => {
    setUploadedFile(files[0]);
    handleImageUpload(files[0]);
  }

  const handleImageUpload = (file) => {
    let upload = request.post(config.uploadURL)
                        .field('upload_preset', config.uploadPreset )
                        .field('file', file);

    upload.end((err, response) => {
      if (err) 
        console.error(err);

      if (response.body.secure_url !== '') 
        setFileURL(response.body.secure_url);      
    });
  }

  return (
  <div id = "reward-editor">
    <Dropzone
      onDrop={onImageDrop}
      accept="image/*"
      multiple={false}>
        {({getRootProps, getInputProps}) => {
          return (
            <div
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
              <p>Click or drag to upload </p>
              }
            </div>
          )
      }}
    </Dropzone>
  </div>
  );
}

export default RewardEditor;