import React, { useState } from 'react';
import Popup from "reactjs-popup";
import CategoryEditor from '../Editors/CategoryEditor';
import './ui.css';

const MainMenu = (props) => {
    const [buttonStyle, setButtonStyle] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const menuStyle = { width: "auto", padding: "0", boxShadow: "-8px 8px 5px #ccc"};
    const subMenuStyle = {...menuStyle, textAlign: "center"};

    const toggleMenu = (shouldOpen) => {
      setButtonStyle(shouldOpen ? {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"} : null);
      setMenuOpen(shouldOpen);
      if (!shouldOpen) {
        props.update("message", true);
      }
    }

    const toggleCategories = (shouldOpen) => {
      if (!shouldOpen) {
        toggleMenu(false);
      }
      setCategoriesOpen(shouldOpen);
    }

  return (
      <Popup trigger = { <div id = "menu-button" style = {buttonStyle} >
                          <i className="fas fa-bars"></i> </div>} 
                          onOpen={() => toggleMenu(true)} arrow={false}
                          open = {menuOpen} onClose = {() => toggleMenu(false)}
                         contentStyle={menuStyle} position='bottom right'>
        <div className="menu">
          <div className="menu-item">Set Path</div>
          <div className = "menu-item leaf" 
               onClick = {() => toggleCategories(true)}>Edit Categories</div>
            <Popup open = {categoriesOpen} onClose = {() => toggleCategories(false)}>
              <div className = "modal">
                <h3>Task and Quest Categories</h3>
                  <div className = "close-button" onClick = {() => toggleCategories(false)}>X</div>
                  <CategoryEditor categories = {props.categories} update = {(s, v) => props.update(s, v)} />
              </div>
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

const CustomButton = React.forwardRef(({open , ...props}, ref) => (
  <button className="close-button" ref={ref} {...props}>
    X
  </button>
));

export default MainMenu;