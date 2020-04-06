import React, { useState } from 'react';
import Popup from "reactjs-popup";
import _ from "lodash"
import PathEditor from '../Editors/PathEditor';
import CategoryEditor from '../Editors/CategoryEditor';
import './ui.css';

const MainMenu = (props) => {
    const [buttonStyle, setButtonStyle] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [pathsOpen, setPathsOpen] = useState(false);
    const menuStyle = { width: "150px", padding: "0", boxShadow: "-8px 8px 5px #ccc"};
    const subMenuStyle = {...menuStyle, textAlign: "center", fontSize: "0.9em"};

    const toggleMenu = (shouldOpen) => {
      setButtonStyle(shouldOpen ? {boxShadow: "-5px 5px 10px #ccc inset", color: "#fff"} : null);
      setMenuOpen(shouldOpen);
    }

    const toggleCategories = (shouldOpen) => {
      if (!shouldOpen) {
        toggleMenu(false);
      }
      setCategoriesOpen(shouldOpen);
    }

    const togglePaths = (shouldOpen) => {
      if (!shouldOpen) {
        toggleMenu(false);
      }
      setPathsOpen(shouldOpen);
    }

    const updateSettings = (setting, value) => {
      toggleCategories(false);
      togglePaths(false);
      props.update(setting, value);
    }

  return (
      <Popup trigger = { <div id = "menu-button" style = {buttonStyle} >
                          <i className="fas fa-bars"></i> </div>} 
                          onOpen={() => toggleMenu(true)} arrow={false}
                          open = {menuOpen} onClose = {() => toggleMenu(false)}
                         contentStyle={menuStyle} position='bottom right'>

        <div className="menu">

        {/*Path Submenu*/}
        <Popup trigger={<div className="menu-item"> Set Path </div>} onClick = {() => toggleMenu(false)}
                        position="left top" on="hover"  arrow = {false} contentStyle={subMenuStyle}>
          {_.keys(props.paths).map(id =>
            <div className="menu-item leaf" key={id} onClick={()=>updateSettings("path", id)}>
              {props.paths[id].name}
            </div> )}  
        </Popup>

        {/*Leveling Speed Submenu*/}
        <Popup trigger={<div className="menu-item"> Set Leveling Speed </div>}
                            position="left top" on="hover"  arrow = {false}
                            contentStyle={subMenuStyle} >
          <div className="subMenu" onClick = {() => toggleMenu(false)}>
            <div className="menu-item leaf" onClick = {()=>updateSettings("speed", 2)}>Slow</div>
            <div className="menu-item leaf" onClick = {()=>updateSettings("speed", 1)}>Balanced</div>
            <div className="menu-item leaf" onClick ={()=>updateSettings("speed", 0)}>Fast</div>
          </div>
        </Popup>    

        {/*Edit Categories*/}
        <div className = "menu-item leaf" 
              onClick = {() => toggleCategories(true)}>Edit Categories</div>
          
          {/*Category Editor Modal*/}
          <Popup open = {categoriesOpen} onClose = {() => toggleCategories(false)}
                contentStyle = {{width: "auto"}} closeOnDocumentClick = {false}>
            <div className = "modal">
              <h3>Task and Quest Categories</h3>
              <div className = "close-button" onClick = {() => toggleCategories(false)}>X</div>
              <CategoryEditor categories = {props.categories} update = {(s,v) => updateSettings(s,v)} />
            </div>
          </Popup>

        {/*Edit Paths*/}             
        <div className = "menu-item leaf" onClick = {() => togglePaths(true)}>Edit Paths</div>

          {/*Path editor modal*/}
          <Popup open = {pathsOpen} onClose = {() => togglePaths(false)}
                contentStyle = {{width: "auto"}} closeOnDocumentClick = {false}>
            <div className = "modal">
              <h3>Leveling Paths</h3>
              <div className = "close-button" onClick = {() => togglePaths(false)}>X</div>
              <PathEditor categories={props.categories.slice(1)} paths={props.paths} update={(s,v)=>updateSettings(s,v)} />
            </div>
          </Popup>

        </div>
      </Popup>
    );
}

export default MainMenu;