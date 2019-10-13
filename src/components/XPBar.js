import React, {useContext} from 'react';
import './XPBar.css';
import appContext from '../context/context';


const XPBar = (props) => {
    const userData = useContext(appContext);

    

    return (
        <div id = "bar">
            <span id = "bar-progress"></span>
            <span id = "bar-background"></span>
        </div>
    );
}

export default XPBar;