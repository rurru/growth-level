import React, { useState } from 'react';
import Popup from "reactjs-popup";
import './ui.css';

const MainMenu = (props) => {
    const [buttonStyle, setButtonStyle] = useState(null);

    const toggleMenu = () => {
      let settingsActive = buttonStyle != null;
      setButtonStyle(settingsActive ? null : {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"});
    }

  return (
      <Popup trigger = { <div id = "menu-button" style = {buttonStyle} >
                          <i className ="fas fa-bars"></i>
                         </div>} onOpen = {toggleMenu} onClose = {toggleMenu} 
                         position ='bottom right'>
        <div className="menu">
          <div className="menu-item">Set Path</div>
          <div className="menu-item"> Set Categories </div>
          <div className="menu-item"> Set Leveling Speed</div>
        </div>
      </Popup>
    );
}

export default MainMenu;