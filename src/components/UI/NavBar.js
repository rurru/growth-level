import React from 'react';
import './ui.css';
import logo from '../../assets/GL-logo.png';

const NavBar = (props) => {
  return (
  <div id = "navbar">
    <div id = "branding">
      <img src = {logo} />
      Growth Level
    </div>   
    <div id = "menu-button">
      <i class="fas fa-bars"></i>
    </div>
  </div>);
}

export default NavBar;