import React, { useState }  from 'react';
import _ from "lodash";
import "./editors.css"; 

const PathEditor = (props) => {

    const [paths, setPaths] = useState(_.cloneDeep(props.paths));
    const [currentPath, setCurrentPath] = useState(0);
    
    const categoryName = (id) => {
        const i = _.findIndex(props.categories, ['id', id]);
        return props.categories[i].name;
    }

    const selectPath = (path) => {
        setCurrentPath(path); 
    }

    const addNew = (pathName) => {
        const newID = _.max(_.keys(paths)) + 1;
        let newPaths = _.cloneDeep(paths);
        newPaths[newID] = {id: newID, name: pathName};
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
            <div className = "table-row table-header">
                <div className = "table-column">Path Name</div>
                <div className = "table-column"></div>
            </div>
        
        {_.keys(paths).slice(1).map ((i) => 
            i === currentPath ?
                <div className = "table-edit-row" key = {paths[i].id}>
                    <div className = "path-name">
                        <input type="text" value={paths[i].name} key = {paths[i].id} 
                            style = {{border: "none"}} className = "settings-input bold"
                            onChange={(e) => updateName(e, i)} />  
                    </div>
                    <div className="path-name">
                    <div className="select-label">Unselected</div>
                    <div className="select-label">Selected</div>
                    </div>
                    <div className = "path-editor">                    
                        <select multiple className="path-cats">
                            {props.categories.filter(c=>!_.includes(paths[i].categories, c.id)).map(c =>
                                <option value={c.name} key={c.id}>{c.name}</option>
                            )}  
                        </select>
                        <select multiple className="path-cats">
                            {paths[i].categories.map(c =>
                                <option value={categoryName(c)} key={c}>
                                    {categoryName(c)}
                                </option>
                            )}
                        </select>    
                    </div>
                </div> :
                <div className = "table-row" key = {paths[i].id}>
                    <div className = "table-column">
                        <input type="text" value={paths[i].name} key={paths[i].id} 
                            style={{border: "none"}} className="settings-input"
                            onClick={(e) => setCurrentPath(0)}
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
                onClick={(e) => setCurrentPath(0)}
                onKeyDown={keyPressed} /> 
        </div>

        <div className = "table-row button submit-button" onClick = {() => props.update("paths", paths)}>
            Submit Changes
        </div>
        </div>
    );
}

export default PathEditor;
