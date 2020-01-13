import React, { useState }  from 'react';
import _ from "lodash";
import "./editors.css"; 

const PathEditor = (props) => {

    const [paths, setPaths] = useState([]);
    const [pathEditorStyle, setPathEditorStyle] = useState({});

    return (
        <div className = "settings-table">          
            <div className = "path-editor" style = {pathEditorStyle} >
                <div className = "options-header">Select Path Categories</div>
            </div>
            <div className = "table-row table-header">
                <div className = "table-column">Name</div>
                <div className = "table-column">Color</div>
            </div>
        {paths.slice(1).map ((path, i) => 
            <div className = "table-row" key = {path.id}>
                <div className = "table-column">
                    <input type="text" value={path.name} key = {path.id} 
                        style = {{border: "none"}} className = "settings-input"
                        onChange={(e) => updateName(e, i)} />  
                </div>
                <div className = "table-column">
                    <div className = "path-edit-button" 
                        onClick = {() => selectCategories(i)} /> 
                </div>
                <div className = "delete" onClick = {() => deletePath(i)}>x</div>
            </div>
        )}
        <div className = "table-row" >     
            <input type="text" className = "settings-input"
                placeholder="Enter new path name" 
                onKeyDown={keyPressed} /> 
        </div>
        <div className = "table-row button submit-button" onClick = {() => props.update("paths", paths)}>
            Submit Changes
        </div>
        </div>
    );

}