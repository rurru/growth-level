import React, {useContext} from 'react';
import './XPBar.css';
import AppContext from '../context/context';


const XPBar = (props) => {
    return (
    <AppContext.Consumer>
    {(level, xp, levelingSpeed, questDecay) => (
        <div id = "bar">
            
        </div>
    )}
    </AppContext.Consumer>
    );
}


export default XPBar;