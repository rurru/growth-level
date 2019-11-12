import React, { useState } from 'react';
import Popup from "reactjs-popup";
import './ui.css';

const MainMenu = (props) => {
    const [buttonStyle, setButtonStyle] = useState(null);
    const menuStyle = { width: "auto", padding: "0", boxShadow: "-8px 8px 5px #ccc"};
    const subMenuStyle = {...menuStyle, textAlign: "center"};

    const toggleMenu = () => {
      let settingsActive = buttonStyle != null;
      setButtonStyle(settingsActive ? null : {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"});
    }

  return (
      <Popup trigger = { <div id = "menu-button" style = {buttonStyle} >
                          <i className="fas fa-bars"></i> </div>} 
                          onOpen={toggleMenu} onClose={toggleMenu} arrow={false}
                         contentStyle={menuStyle} position='bottom right'>
        <div className="menu">
          <div className="menu-item">Set Path</div>
          <div className="submenu-item"> Edit Categories </div>

          <Popup trigger={<div className="menu-item"> Set Leveling Speed </div>}
                            position="left top" on="hover"  arrow = {false}
                            contentStyle={subMenuStyle}>
            <div className="subMenu">
              <div className="submenu-item">Slow</div>
              <div className="submenu-item">Balanced</div>
              <div className="submenu-item">Fast</div>
            </div>
          </Popup>

        </div>
      </Popup>
    );
}

export default MainMenu;