import React, { useState } from 'react';
import Popup from "reactjs-popup";
import CategoryEditor from '../Editors/CategoryEditor';
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

          <Popup trigger = { <div className="menu-item leaf"> 
                              Edit Categories </div>}
                            contentStyle = {{width: "auto", display: "flex", padding: "20px",
                              justifyContent: "center", alignItems: "center", flexDirection: "column"}}
                            onClose = {() => toggleMenu(false)}
                            modal closeOnDocumentClick >
              <h3>Task and Quest Categories</h3>
            <CategoryEditor categories = {props.categories} update = {(s, v) => props.update(s, v)} />
          </Popup>

          <Popup trigger={<div className="menu-item"> Set Leveling Speed </div>}
                            position="left top" on="hover"  arrow = {false}
                            contentStyle={subMenuStyle} closeOnDocumentClick>
            <div className="subMenu" onClick = {() => toggleMenu(false)}>
              <div className="menu-item leaf" onClick = {()=>props.update("speed", 2)}>Slow</div>
              <div className="menu-item leaf" onClick = {()=>props.update("speed", 1)}>Balanced</div>
              <div className="menu-item leaf" onClick ={()=>props.update("speed", 0)}>Fast</div>
            </div>
          </Popup>

        </div>
      </Popup>
    );
}

export default MainMenu;