import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const LevelUpNotification = (props) => {
    return (
        <div id = "level-notify">
            <div className = "edit-button-row">
                <Link to="/rewardList" className="button-link">
                    <div className = "button item-edit-button submit-button"
                     onClick = {props.close}>
                        Select Reward
                    </div>
                </Link>                    
                <div className = "button item-edit-button cancel-button" onClick={props.close}>Cancel</div>                
            </div>
        </div>
    )
}

export default LevelUpNotification;