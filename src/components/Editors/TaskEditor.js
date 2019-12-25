import React, {useState, useEffect} from 'react';
import {icons} from './../../constants';
import "./editors.css"; 

const TaskEditor = (props) => {

  
  const [iconPickerStyle, setIconPickerStyle] = useState({display: "none"});
  const [icon, setIcon] = useState("fas fa-tree");
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

  const selectIcon = (icon) => {
    setIcon(icon);
    setIconPickerStyle({display: "none"});
  }

  return (
    <div id = "task-editor">        
    <div className = "task-icon-picker" style = {iconPickerStyle} >
    <div className = "options-header">Choose an Icon</div>
    { icons.map(icon =>
        <div className = "task-icon-option" 
             key = {icon}
             onClick = {() => selectIcon(icon)}>
          <i class={icon}></i>
        </div>
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
      <span className = "task-icon-button" onClick = {() => setIconPickerStyle({display:"block"})}>
        <i class={icon}></i>
      </span>
      <span className = "form-label">Icon</span> 
      <div id = "task-buttons">
        <div className = "button task-edit-button">Cancel</div>
        <div className = "button task-edit-button submit-button ">Submit Task</div>
        <div className = "button task-edit-button">Delete Task</div>
      </div>
    </div>
  );
}

export default TaskEditor;