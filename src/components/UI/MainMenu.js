import React, { useState } from 'react';
import Popup from "reactjs-popup";
import './ui.css';

const MainMenu = (props) => {
    const [buttonStyle, setButtonStyle] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuStyle = { width: "auto", padding: "0", boxShadow: "-8px 8px 5px #ccc"};
    const subMenuStyle = {...menuStyle, textAlign: "center"};

    const toggleMenu = (shouldOpen) => {
      setButtonStyle(shouldOpen ? {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"} : null);
      setMenuOpen(shouldOpen);
    }

  return (
      <Popup trigger = { <div id = "menu-button" style = {buttonStyle} >
                          <i className="fas fa-bars"></i> </div>} 
                          onOpen={() => toggleMenu(true)} arrow={false}
                          open = {menuOpen} onClose = {() => toggleMenu(false)}
                         contentStyle={menuStyle} position='bottom right'>
        <div className="menu">
          <div className="menu-item">Set Path</div>
          <div className="submenu-item"> Edit Categories </div>

          <Popup trigger={<div className="menu-item"> Set Leveling Speed </div>}
                            position="left top" on="hover"  arrow = {false}
                            contentStyle={subMenuStyle} closeOnDocumentClick>
            <div className="subMenu" onClick = {() => toggleMenu(false)}>
              <div className="submenu-item" onClick = {()=>props.changeSpeed(0)}>Slow</div>
              <div className="submenu-item" onClick = {()=>props.changeSpeed(1)}>Balanced</div>
              <div className="submenu-item" onClick = {()=>props.changeSpeed(2)}>Fast</div>
            </div>
          </Popup>

        </div>
      </Popup>
    );
}

export default MainMenu;