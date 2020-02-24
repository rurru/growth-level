import React, { useState } from 'react';
import './ui.css';
import logo from '../../assets/GL-logo.png';

const NavBar = (props) => {
  return (
  <div id = "navbar">
    <div id = "branding">
      <img src = {logo} />
      Growth Level <span id="level">{props.level}</span>
       {props.children}

    </div>  
  </div>);
}

export default NavBar;