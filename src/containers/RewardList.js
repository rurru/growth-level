import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import Firebase from 'firebase';
import _ from "lodash";
import RewardEditor from '.././components/Editors/RewardEditor';

const RewardList = (props) => {
  const [editingReward, setEditingReward] = useState(0);
  const [editMode, setEditMode] = useState("default");
  const [editModeStyle, setEditModeStyle] = useState({});
  const [rewards, setRewards] = 
    useState([{id: 0, name: "", level: props.level, userID: props.user, url: ''}]); 

  const toggleEditMode = () => {
    if (editMode != "edit") {
        setEditMode("edit");
        setEditModeStyle({boxShadow: "-5px 5px 10px #ccc inset"} );
    } else {
        setEditMode("default");
        setEditingReward(0);
        setEditModeStyle({});
    }
  }

  const cancelEdit = () => {
    if (editMode=="new") {
        setEditMode("default");
    }
    setEditingReward(0);
}

const saveReward = (reward) => {
  const newRewards = _.cloneDeep(rewards);
  if (reward.id === 0) {
      reward.id = rewards.length === 0 ? 1 : rewards[rewards.length-1].id + 1;
      newRewards.push(reward);           
      setEditMode("default");
  } else {
      const i = _.findIndex(rewards, ['id', reward.id]);
      newRewards[i] = _.cloneDeep(reward);
  }

  Firebase.database().ref(reward.userID + '/rewards/' + reward.id).set({
      id: reward.id,
      name: reward.name, 
      level: reward.level,
      url: reward.url
    });

  setRewards(_.cloneDeep(newRewards));
  setEditingReward(0);
}

const deleteReward= (id) => {
  const rewardRef = Firebase.database().ref(props.user + '/rewards/');
  rewardRef.child(id).remove();
  const newRewards = _.pullAllBy(rewards, [{ 'id': id }], 'id');
  setRewards(newRewards);
  toggleEditMode();
}

  return (
    <div className = "container">
      <div className = "add-button" onClick = {() => setEditMode("new")}>
        <Popup open = {editMode == "new" || editingReward > 0} 
          contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
            <div className = "modal" >
                <RewardEditor reward = {rewards[_.findIndex(rewards, ['id', editingReward])]} 
                    categories = {props.categories}
                    user = {props.user}
                    cancel = {() => cancelEdit()}
                    save = {saveReward}
                    delete = {deleteReward} 
                  />
            </div>
        </Popup>
        <i className="fas fa-plus"></i>
      </div>
      <div className = "edit-button" onClick={() => toggleEditMode()} style = {editModeStyle} >
        <i className="fas fa-pen"></i>
      </div>
    </div>);
}

export default RewardList;