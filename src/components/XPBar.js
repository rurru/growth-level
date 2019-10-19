import React from 'react';
import './XPBar.css';


const XPBar = (props) => {
    return (
        <div id = "bar">
            <span id = "bar-progress" 
             style = {{width: props.progress.current+"%"}}></span>
            <span id = "bar-background"
             style = {{width: props.progress.toLevel+"%"}}></span>
        </div>
    );
}

export default XPBar;