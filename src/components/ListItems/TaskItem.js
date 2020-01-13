import React, {useState} from 'react';
import './ListItems.css';
//category colors are predefined so they can be mapped to font color

const TaskItem = (props) => {
  const {color, font} = props.color;
  const taskStyle = {color: font, backgroundColor: color};
  const classes = props.editing ? "task-item editing-task" : "task-item";

  return (
  <div className={classes} key = {props.id} style = {taskStyle}
      onClick = {() => props.onTaskClick(props.id)}>
      <div className = "item-title">{props.name}</div>
      <i className={props.icon}></i>    
      <span className="level">{props.level}</span>
  </div>)
}

export default TaskItem;