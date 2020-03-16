import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import Firebase from 'firebase';
import _ from "lodash";
import RewardEditor from '.././components/Editors/RewardEditor';

const RewardList = (props) => {
  const [editingReward, setEditingReward] = useState(0);
  const [editMode, setEditMode] = useState("default");
  const [editModeStyle, setEditModeStyle] = useState({});
  const [rewards, setRewards] = useState({});

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

  return (
    <div className = "container">
      <div className = "add-button" onClick = {() => setEditMode("new")}>
        <Popup open = {editMode == "new" || editingReward > 0} 
          contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
            <div className = "modal" >
                <RewardEditor /*reward = {tasks[_.findIndex(tasks, ['id', editingTask])]} 
                    categories = {props.categories}
                    user = {props.user}
                    cancel = {() => cancelEdit()}
                    save = {saveTask}
                    delete = {deleteTask} */
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