import React from 'react';
import './ListItems.css';

const RewardItem = (props) => {
  const classes = props.active ? "reward-item" : "inactive-reward-item";
  if (props.editing) classes += " editing-reward";

  return (
  <div className={classes} key = {props.id} 
    onClick = {props.active ? () => props.onRewardClick(props.id) : ''}>       
      <img src = {props.url} className = "reward-image" />
      <div className = "reward-item-label">{props.name}</div>
  </div>);
}

export default RewardItem;