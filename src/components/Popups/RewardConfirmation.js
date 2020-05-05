import React, {useState} from 'react';

const LevelUpNotification = (props) => {

    return (
        <div id = "level-notify">
            <div className = "edit-button-row">
                <div className = "button item-edit-button submit-button" 
                    onClick={() => handleSelect(props.reward.id)}>Select</div>
                <div className = "button item-edit-button cancel-button" onClick={props.cancel}>Cancel</div>
            </div>
        </div>
    )
}

export default RewardConfirmation;