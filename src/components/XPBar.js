import React from 'react';
import './XPBar.css';


const XPBar = (props) => {
    return (
        <div id = "bar">
            <span id = "bar-progress" 
             style = {{width: props.progress.current+"%"}}></span>
            <span id = "bar-background"
             style = {{width: props.progress.toLevel+"%"}}></span>             
            <div id = "xp-bar-overlay">{props.xp} / {props.xpToLevel} </div>
        </div>
    );
}

export default XPBar;