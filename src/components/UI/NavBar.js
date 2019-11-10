import React, { useState } from 'react';
import './ui.css';
import logo from '../../assets/GL-logo.png';

const NavBar = (props) => {
  const [buttonStyle, setButtonStyle] = useState(null);

  const toggleSettings = () => {
    let settingsActive = buttonStyle != null;
    setButtonStyle(settingsActive ? null : {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"});
    
  }

  return (
  <div id = "navbar">
    <div id = "branding">
      <img src = {logo} />
      Growth Level
       
    <div id = "menu-button" style = {buttonStyle} onClick = {toggleSettings} >
      <i className ="fas fa-bars"></i>
    </div>
    </div>  
  </div>);
}

export default NavBar;