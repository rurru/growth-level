import React, { useState, useEffect }  from 'react';
import _ from "lodash";
import "./editors.css"; 

const PathEditor = (props) => {
    const [paths, setPaths] = useState(_.cloneDeep(props.paths));
    const [currentPath, setCurrentPath] = useState(0);
    const [selectedToMove, setSelectedToMove] = useState([]);
    const [unselectedToMove, setUnselectedToMove] = useState([]);

    useEffect(() => {
        setSelectedToMove([]);
        setUnselectedToMove([]);}, paths);
    
    const categoryName = (id) => {
        const i = _.findIndex(props.categories, ['id', id]);
        return props.categories[i].name;
    }

    const handleSelect = (e) => {
        const options = e.target.options;
        let vals = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) vals.push(parseInt(options[i].value, 10));
          }
        e.target.id == "selected" ? setSelectedToMove(vals) : setUnselectedToMove(vals);
    }

    const addCategories = () => {
        const newCats = paths[currentPath].categories.concat(unselectedToMove);
        let newPaths = _.cloneDeep(paths);
        newPaths[currentPath].categories = newCats;
        setPaths(newPaths); 
        console.log(newPaths);
    }

    const removeCategories = () => {        
        const newCats = paths[currentPath].categories.filter(c => 
            !_.includes(selectedToMove, c));
        let newPaths = _.cloneDeep(paths);
        newPaths[currentPath].categories = newCats;
        setPaths(newPaths); 
    }

    const addNew = (pathName) => {
        const newID = Number(_.max(_.keys(paths))) + 1;
        let newPaths = _.cloneDeep(paths);
        newPaths[newID] = {id: newID, name: pathName, level: 1, xp: 0, categories: [0], rewardsEarned: [0]};
        setPaths(newPaths);
    }

    const updateName = (e, id) => {
        let newPaths = _.cloneDeep(paths);
        newPaths[id].name = e.target.value;
        setPaths(newPaths);
    }

    const deletePath = (id) => {
        const newPaths = _.pullAllBy(paths, [{ 'id': id }], 'id');
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
                <div className = "table-edit-row" key = {paths[i].id+"row"}>
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
                        <select multiple className="path-cats" id="unselected" onChange={handleSelect}>
                            {props.categories.filter(c =>
                                !_.includes(paths[i].categories, c.id)).map(c =>
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                )}  
                        </select>
                        <div id="path-edit-row">
                            <button className = "path-edit-button" onClick={()=>addCategories()}>
                                <i className="fas fa-angle-double-right"></i>
                            </button>
                            <button className = "path-edit-button" onClick={()=>removeCategories()}>
                                <i className="fas fa-angle-double-left"></i>
                            </button>
                        </div>
                        <select multiple className="path-cats" id="selected" onChange={handleSelect}>
                            {paths[i].categories.slice(1).map(c =>
                                <option value={c} key={c}>
                                    {categoryName(c)}
                                </option>
                            )}
                        </select>    
                    </div>
                </div> : 
                <div className = "table-row" key ={paths[i].id+"row"}>
                    <div className = "table-column" >
                        <input type="text" value={paths[i].name} key={paths[i].id} 
                            style={{border: "none"}} className="settings-input"
                            onClick={(e) => setCurrentPath(0)}
                            onChange={(e) => updateName(e, i)} />  
                    </div> 
                    <div className="table-column">
                        <div className="edit" onClick={() => setCurrentPath(i)} key={paths[i].id}> 
                            <i className="fas fa-pencil-alt"></i>
                        </div>
                    </div> 
                    <div className="delete" onClick={() => deletePath(i)} key={paths[i].id}>x</div>  
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