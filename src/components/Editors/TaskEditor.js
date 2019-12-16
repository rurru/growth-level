import React, {useState, useEffect} from 'react';
import "./editors.css"; 

const TaskEditor = (props) => {

  

  return (
    <div id = "task-editor">
      <div className = "form-header">Add New Task</div>
      <div className = "form-label">Name</div>
      <input type="text" className = "settings-input" onChange={(e) => updateName(e)} />  
    </div>
  );
}

export default TaskEditor;