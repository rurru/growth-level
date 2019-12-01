import React, { useState }  from 'react';
import "./editors.css"; 
import { categoryColors } from "./../../constants"

const CategoryEditor = (props) => {
    const [categories, setCategories] = useState([...props.categories]);
    const [colorPickerStyle, setColorPickerStyle] = useState({display: "none"});
    const [currentCategory, setCurrentCategory] = useState(0);

    const selectCategory = (cat) => {
        setColorPickerStyle({display: "block", top: -227 + (cat+2)*36 + "px"});
        setCurrentCategory(cat); 
    }

    const selectColor = (color) => {
        let newCategories = [...categories];
        newCategories[currentCategory].color = color;
        setColorPickerStyle({display: "none"});
        setCategories(newCategories);
    }

    const updateName = (e, i) => {
        let newCategories = [...categories];
        newCategories[i].name = e.target.value;
        setCategories(newCategories);
    }

    const addNew = (e) => {

    }

    return (
    <div className = "settings-table" >    
        <div className = "category-color-picker" style = {colorPickerStyle} >
            <div className = "options-header">Choose a Color</div>
            { categoryColors.map(color =>
                <div className = "category-color-option" 
                     key = {color.color}
                     style = {{backgroundColor: color.color}} 
                     onClick = {() => selectColor(color)} />
                )
            }
        </div>
        <div className = "table-row table-header">
            <div className = "table-column">Name</div>
            <div className = "table-column">Color</div>
        </div>
        {categories.map ((cat, i) => 
            <div className = "table-row" key = {cat.color.color}>
                <div className = "table-column">
                    <input type="text" value={cat.name} 
                        style = {{border: "none"}} className = "settings-input"
                        onChange={(e) => updateName(e, i)} />  
                </div>
                <div className = "table-column">
                    <div className = "category-color" 
                        style = {{backgroundColor: cat.color.color}}
                        onClick = {() => selectCategory(i)} /> 
                </div>
            </div>
        )}
        <div className = "table-row" >     
            <input type="text" className = "settings-input"
                placeholder="Enter new category name" 
                onChange={(e) => addNew(e)} /> 
        </div>
        <div className = "table-row button-row" onClick = {() => props.update("categories", categories)}>
            Submit Changes
        </div>
    </div>)
}   

export default CategoryEditor;