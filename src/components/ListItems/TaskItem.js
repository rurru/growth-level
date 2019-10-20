import React from 'react';

//category colors are predefined so they can be mapped to font color

const TaskItem = (props) => {
  const taskStyle = {
    color: props.category.fontColor,
    backgroundColor: props.category.bgColor
  };

  return (
  <div className = "taskItem" key = {taskId} style = {taskStyle}
    onClick = {(level) => props.onTaskClick(level)}>
    {props.taskName}
    <i className={"fas fa-"+props.icon}></i>
  </div>);
}

export default TaskItem;