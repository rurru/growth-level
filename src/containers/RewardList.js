import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import Firebase from 'firebase';
import _ from "lodash";
import config from '../Config';
import RewardItem from '../components/ListItems/RewardItem';
import RewardEditor from '../components/Popups/RewardEditor';
import RewardConfirmation from '../components/Popups/RewardConfirmation';

const RewardList = (props) => {
  const rewardTemplate = {id: 0, name: "", level: props.levelInfo.level, userID: props.user, url: ''};

  const [editingReward, setEditingReward] = useState(0);
  const [selectedReward, setSelectedReward] = useState(rewardTemplate);
  const [editMode, setEditMode] = useState("default");
  const [editModeStyle, setEditModeStyle] = useState({});
  const [rewards, setRewards] = useState([rewardTemplate]);
    useState([]); 

    useEffect(() => {       
      if (!Firebase.apps.length)
          Firebase.initializeApp(config); 
      getRewards().then(rewardList => {                      
          const savedRewards = Array.isArray(rewardList) ?
          rewardList.filter(t=>t!=null) :
          _.keys(rewardList).filter(t=>t!=null).map(t =>
              { return {
                  userID: rewardList[t].userID,
                  id: Number(rewardList[t].id), 
                  name: rewardList[t].name, 
                  level: rewardList[t].level,
                  url: rewardList[t].url
                } }
           );

           const loadedrewards = rewards.concat(savedRewards);
            setRewards(_.cloneDeep(loadedrewards));
      });
  }, []);

  const getRewards = async () => {
    var rewardRef = Firebase.database().ref(props.user + '/rewards/');
    var rewardItems = await rewardRef.once('value');
    return rewardItems.val();
  }

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
    setSelectedReward(rewardTemplate)
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

const handleRewardClick = (val) => {
  if (editMode=="edit") {
      setEditingReward(val);
  } else {
    const i = _.findIndex(rewards, ['id', val]);
    setSelectedReward(rewards[i]);
  }
}   

  return (
    <div className = "container">      
      <Popup open = {selectedReward.id > 0} 
          contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
            <div className = "modal" >
              <RewardConfirmation reward = {selectedReward} 
                cancel = {cancelEdit} />
            </div>
        </Popup>
      <div className = "add-button" onClick = {() => setEditMode("new")}>
        <Popup open = {editMode == "new" || editingReward > 0} 
          contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
            <div className = "modal" >
                <RewardEditor reward = {rewards[_.findIndex(rewards, ['id', editingReward])]}                   
                    user = {props.user}
                    cancel = {() => cancelEdit()}
                    save = {saveReward}
                    delete = {deleteReward} 
                  />
            </div>
        </Popup>
        <i className="fas fa-plus"></i>
      </div>
      {_.tail(rewards).map(reward =>
                    <RewardItem {...reward} 
                        key={reward.id}
                        active={reward.level <= _.max(props.earned)}
                        editing={editMode=="edit"}
                        onRewardClick={() => handleRewardClick(reward.id)} />
                ) 
            }
      <div className = "edit-button" onClick={() => toggleEditMode()} style = {editModeStyle} >
        <i className="fas fa-pen"></i>
      </div>
    </div>);
}

export default RewardList;