import React, { useState }  from 'react';
import _ from "lodash";
import "./editors.css"; 

const PathEditor = (props) => {

    const [paths, setPaths] = useState(_.cloneDeep(props.paths));
    const [pathEditorStyle, setPathEditorStyle] = useState({display: "none"});
    const [currentPath, setCurrentPath] = useState(0);

    const selectPath = (path) => {
        setPathEditorStyle({display: "block", top: -227 + (path+2)*36 + "px"});
        setCurrentPath(path); 
    }

    const addNew = (pathName) => {
        const newPaths = paths.concat(
            [{id: paths[paths.length-1].id + 1,
              name: pathName}]);
        setPaths(newPaths);
    }

    const updateName = (e, i) => {
        let newPaths = _.cloneDeep(paths);
        newPaths[i+1].name = e.target.value;
        setPaths(newPaths);
    }

    const deletePath = (i) => {
        let newPaths = _.cloneDeep(paths);
        newPaths.splice(i, 1);
        setPaths(newPaths);
    }

    const keyPressed = (e) => {
        if (e.keyCode === 13) {
          addNew(e.target.value);
          e.target.value = '';
        }
      }


    return (
        <div className = "settings-table">          
            <div className = "path-editor" style = {pathEditorStyle} >
                <div className = "options-header">Select Path Categories</div>
            </div>
            <div className = "table-row table-header">
                <div className = "table-column">Path Name</div>
                <div className = "table-column"></div>
            </div>
        
        {paths.slice(1).map ((path, i) => 
            <div className = "table-row" key = {path.id}>
                <div className = "table-column">
                    <input type="text" value={path.name} key = {path.id} 
                        style = {{border: "none"}} className = "settings-input"
                        onChange={(e) => updateName(e, i)} />  
                </div>
                <div className = "table-column">
                    <div className="edit" onClick = {() => selectPath(i)} > 
                          <i className="fas fa-pencil-alt"></i>
                    </div>
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

export default PathEditor;
