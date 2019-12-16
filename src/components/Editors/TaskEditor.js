import React, {useState, useEffect} from 'react';
import "./editors.css"; 

const TaskEditor = (props) => {

  const level = props.task.level;
  let levelOptions = [];

  for (let i = level-5; i <= level+5; i++) {
    if (i > 0) levelOptions.push(i);
  }

  const updateName = (e) => {

  }

  return (
    <div id = "task-editor">
      <div className = "form-header">Add New Task</div>
      
      <div className = "form-label">Task Name</div>
      <input type="text" className="settings-input" onChange={(e) => updateName(e)} />

      <div className = "form-label">Category</div> 
      <select className="settings-input settings-select">
        {props.categories.map(cat => <option value={cat.name}>{cat.name}</option>)}
      </select>

      <div className = "form-label">Level</div> 
      <select className="settings-input settings-select">
        {levelOptions.map(lvl => <option value={lvl}>{lvl}</option>)} 
      </select>

    </div>
  );
}

export default TaskEditor;