import React from 'react';
import './ListItems.css';
//category colors are predefined so they can be mapped to font color

const TaskItem = (props) => {

  console.log(props);

  const taskStyle = {
    color: props.category.color.font,
    backgroundColor: props.category.color.color
  };

  console.log(taskStyle);

  return (
  <div className = "task-item" key = {props.id} style = {taskStyle}
    onClick = {(level) => props.onTaskClick(level)}>
    <div className = "item-title">{props.name}</div>
    <i className={props.icon}></i>
  </div>);
}

export default TaskItem;