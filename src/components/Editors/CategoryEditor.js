import React, { useState }  from 'react';
import "./editors.css";

const CategoryEditor = (props) => {
    const [colorPickerStyle, setColorPickerStyle] = useState({display: "none"});

    return (
    <div className = "settings-table" >    
        <div className = "category-color-picker" style = {colorPickerStyle} >
            Choose a Color
        </div>
        <div className = "table-row table-header">
            <div className = "table-column">Name</div>
            <div className = "table-column">Color</div>
        </div>
        {props.categories.map ((cat, i) => 
            <div className = "table-row" key = {cat.color.color}>
                <div className = "table-column">{cat.name}</div>
                <div className = "table-column">
                    <div className = "category-color" 
                        style = {{backgroundColor: cat.color.color}}
                        onClick = {() => setColorPickerStyle({display: "block", top: -261 + (i+2)*36 + "px"})} > 
                    </div>
                </div>
            </div>
        )}
    </div>)
}   

export default CategoryEditor;