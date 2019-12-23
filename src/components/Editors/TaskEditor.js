import React, {useState, useEffect} from 'react';
import {icons} from './../../constants';
import "./editors.css"; 

const TaskEditor = (props) => {

  
  const [iconPickerStyle, setIconPickerStyle] = useState({display: "none"});
  const [autoLevel, setAutoLevel] = useState(false);


  const level = props.task.level;
  let levelOptions = [];

  for (let i = level-5; i <= level+5; i++) {
    if (i > 0) levelOptions.push(i);
  }

  const updateName = (e) => {
  }

  const toggleAutoLevel =  () => {
    const newSetting = !autoLevel;
    setAutoLevel(newSetting);
  }

  const selectIcon =  (icon) => {
  }

  return (
    <div id = "task-editor">        
    <div className = "task-icon-picker" style = {iconPickerStyle} >
    <div className = "options-header">Choose an Icon</div>
    { icons.map(icon =>
        <div className = "task-icon-option" 
             key = {icon}
             onClick = {() => selectIcon(icon)} />
        )
    }
</div>
      <div className = "form-header">Add New Task</div>
      
      <div className = "form-label">Task Name</div>
      <input type="text" className="settings-input" onChange={(e) => updateName(e)} />

      <div className = "form-label">Category</div> 
      <select className="settings-select">
        {props.categories.map(cat => <option value={cat.name}>{cat.name}</option>)}
      </select>

      <div className = "form-label">Level</div> 
      <select className="settings-select-small">
        {levelOptions.map(lvl => <option value={lvl}>{lvl}</option>)} 
      </select>
      
      <input type="checkbox" name="autoLevel" className = "settings-option"
        checked={autoLevel} onChange={toggleAutoLevel} />
        <span className = "form-label">Auto Level</span>
      <span className = "task-icon-button">
      <i class="fas fa-tree"></i>
      </span>
      <span className = "form-label">Icon</span> 
    </div>
  );
}

export default TaskEditor;