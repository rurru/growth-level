import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import config from '../../Config';

const RewardEditor = (props) => {

  const [rewardName, setRewardName] = useState(props.reward.name);
  const [rewardLevel, setRewardLevel] = useState(props.reward.level);
  const [uploadedFile, setUploadedFile] = useState('');
  const [fileURL, setFileURL] = useState('');

  let levelOptions = [];

  for (let i = rewardLevel-5; i <= rewardLevel+5; i++) {
    if (i > 0) levelOptions.push(i);
  }

  const updateName = (e) => {
    setRewardName(e.target.value);
  }

  const updateLevel = (e) => {
    setRewardLevel(e.target.value);
  }

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


  const handleSubmit = () => {

  }

  return (
  <div id = "reward-editor">
    <div className = "form-header">{props.reward.id === 0 ? "Add New Reward" : "Edit Reward"}</div>
    <div className = "form-label">Reward Name</div>
      <input type="text" className="settings-input" value={rewardName} onChange={(e) => updateName(e)} />
      <div className = "form-label">Level</div> 
      <select className="settings-select-small" value = {rewardLevel} onChange={updateLevel}>
        {levelOptions.map(lvl => <option value={lvl} key={lvl} >{lvl}</option>)} 
      </select>
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
    <div>
        {uploadedFile === '' ? null :
        <div>
          <p>{uploadedFile.name}</p>
          <img src={fileURL} />
        </div>}
      </div>

      <div className = "edit-button-row">
        <div className = "button item-edit-button cancel-button" onClick={props.cancel}>Cancel</div>
        <div className = "button item-edit-button submit-button" onClick={handleSubmit}>Submit Reward</div>
        {props.reward.name === "" ? "" : 
          <div className="button item-edit-button delete-button" 
            onClick={()=>props.delete(props.reward.id)}>Delete Reward</div>}
      </div>
    </div>
  );
}

export default RewardEditor;