import React, {useState, useEffect} from 'react';
import {icons} from './../../constants';
import "./editors.css"; 

const TaskEditor = (props) => {
  const [taskIcon, setTaskIcon] = useState(props.task.icon);
  const [taskName, setTaskName] = useState(props.task.name);
  const [taskLevel, setTaskLevel] = useState(props.task.level);
  const [categoryID, setCategoryID] = useState(props.task.category);
  
  const [iconPickerStyle, setIconPickerStyle] = useState({display: "none"});
  const [autoLevel, setAutoLevel] = useState(false);

  let levelOptions = [];

  for (let i = taskLevel-5; i <= taskLevel+5; i++) {
    if (i > 0) levelOptions.push(i);
  }

  const updateName = (e) => {
    setTaskName(e.target.value);
  }

  const updateCategory = (e) => {
    setCategoryID(e.target.value);
  }

  const updateLevel = (e) => {
    setTaskLevel(e.target.value);
  }

  const toggleAutoLevel =  () => {
    const newSetting = !autoLevel;
    setAutoLevel(newSetting);
  }

  const selectIcon = (icon) => {
    setTaskIcon(icon);
    setIconPickerStyle({display: "none"});
  }

  const handleSubmit = () => {
    const task = {
      id: props.task.id,
      name: taskName, 
      category: categoryID,  
      icon: taskIcon, 
      level: taskLevel, 
      auto: autoLevel
    }
    props.save(task);
  }

  return (
    <div id = "task-editor">        
    <div className = "task-icon-picker" style = {iconPickerStyle} >
    <div className = "options-header">Choose an Icon</div>
    { icons.map(icon =>
        <div className = "task-icon-option" 
             key = {icon}
             onClick = {() => selectIcon(icon)}>
          <i className={icon}></i>
        </div>
        )
    }
</div>
      <div className = "form-header">{props.task.id === 0 ? "Add New Task" : "Edit Task"}</div>
      
      <div className = "form-label">Task Name</div>
      <input type="text" className="settings-input" value={taskName} onChange={(e) => updateName(e)} />

      <div className = "form-label">Category</div> 
      <select className="settings-select" value={categoryID}
        onChange = {(e) => updateCategory(e)}> 
        {props.categories.map((cat) => <option value={cat.id} key={cat.id}>{cat.name}</option>) }
      </select>

      <div className = "form-label">Level</div> 
      <select className="settings-select-small" value = {taskLevel} onChange={updateLevel}>
        {levelOptions.map(lvl => <option value={lvl} key={lvl} >{lvl}</option>)} 
      </select>
      
      <input type="checkbox" name="autoLevel" className = "settings-option"
        checked={autoLevel} onChange={toggleAutoLevel} />
        <span className = "form-label">Auto Level</span>
      <span className = "task-icon-button" onClick = {() => setIconPickerStyle({display:"block"})}>
        <i className={taskIcon}></i>
      </span>
      <span className = "form-label">Icon</span> 
      <div id = "task-buttons">
        <div className = "button task-edit-button cancel-button" onClick={props.cancel}>Cancel</div>
        <div className = "button task-edit-button submit-button" onClick={handleSubmit}>Submit Task</div>
        {props.task.name === "" ? "" : <div className="button task-edit-button delete-button">Delete Task</div>}
      </div>
    </div>
  );
}

export default TaskEditor;