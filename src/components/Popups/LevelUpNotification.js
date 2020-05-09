import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const LevelUpNotification = (props) => {

    return (
        <div id = "level-notify">
            <div className = "edit-button-row">
                <Link to="/rewardList" className="button-link">
                    <div className = "button item-edit-button submit-button">
                        Select Reward
                    </div>
                </Link>                    
                <div className = "button item-edit-button cancel-button" onClick={props.cancel}>Cancel</div>                
            </div>
        </div>
    )
}

export default LevelUpNotification;