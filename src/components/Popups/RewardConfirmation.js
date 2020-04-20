import React, {useState} from 'react';

const RewardConfirmation = (props) => {
    const [keepReward, setKeepReward] = useState(false);

    const toggleKeepReward =  () => {
        const newSetting = !keepReward;
        setKeepReward(newSetting);
      }

    return (
        <div id = "reward-confirm">
            Are you sure you would like to select 
            <span className = "reward-confirm-name"> {props.reward.name} </span>
            as your reward?
            <img className = "reward-confirm-image" src={props.reward.url} />
            <input type="checkbox" name="keepReward" className="settings-option"
             checked={keepReward} onChange={toggleKeepReward} />
            Keep Reward in List
        </div>
    )
}

export default RewardConfirmation;