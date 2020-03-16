import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {uploadConfig} from '../Config';

const RewardEditor = (props) => {
  return (
  <div>
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  </div>
  );
}

export default RewardEditor;