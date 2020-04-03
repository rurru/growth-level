import React from 'react';
import './ListItems.css';

const RewardItem = (props) => {
  const classes = props.editing ? "reward-item editing-reward" : "reward-item";

  return (
  <div className="reward-item" key = {props.id} onClick = {() => props.onRewardClick(props.id)}>       
      <img src = {props.url} className = "reward-image" />
      <div className = "reward-item-label">{props.name}</div>
  </div>);
}

export default RewardItem;