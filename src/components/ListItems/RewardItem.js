import React from 'react';
import './ListItems.css';

const RewardItem = (props) => {
  let classes = "reward-item";
  if (props.editing) classes += " editing-reward";
  else if (!props.active) classes += " inactive";
  
  if (props.editing) classes = "reward-item editing-reward";

  return (
  <div className={classes} key = {props.id} 
    onClick = {props.active ? () => props.onRewardClick(props.id) : null}>           
      <div className = "reward-item-label level-label">LEVEL {props.level} </div>  
      <img src = {props.url} className = "reward-image" />
      <div className = "reward-item-label">{props.name}</div>
  </div>);
}

export default RewardItem;