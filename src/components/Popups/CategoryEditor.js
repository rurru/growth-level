import React, { useState }  from 'react';
import _ from "lodash";
import { categoryColors } from "../../constants"
import "./editors.css"; 

const CategoryEditor = (props) => {
    const [categories, setCategories] = useState(_.cloneDeep(props.categories));
    const [colorPickerStyle, setColorPickerStyle] = useState({display: "none"});
    const [currentCategory, setCurrentCategory] = useState(0);

    const selectCategory = (cat) => {
        setColorPickerStyle({display: "block", top: -227 + (cat+2)*36 + "px"});
        setCurrentCategory(cat); 
    }

    const selectColor = (color) => {
        let newCategories = _.cloneDeep(categories);
        newCategories[currentCategory+1].color = color;
        setColorPickerStyle({display: "none"});
        setCategories(newCategories);
    }

    const updateName = (e, i) => {
        let newCategories = _.cloneDeep(categories);
        newCategories[i+1].name = e.target.value;
        setCategories(newCategories);
    }

    const keyPressed = (e) => {
        if (e.keyCode === 13) {
          addNew(e.target.value);
          e.target.value = '';
        }
      }

    const addNew = (catName) => {
        const category = {
            id: Number(categories[categories.length-1].id) + 1,
            name: catName, 
            color: categoryColors[Math.floor(Math.random() * 10)],
            active: true};
        const newCats = categories.concat([category]);
        setCategories(newCats);
    }

    const deleteCategory = (i) => {
        let newCategories = _.cloneDeep(categories);
        newCategories[i+1].active = false;
        setCategories(newCategories);
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
        {categories.filter(c=>c.active).map ((cat, i) => 
            <div className = "table-row" key = {cat.id}>
                <div className = "table-column">
                    <input type="text" value={cat.name} key = {cat.id} 
                        style = {{border: "none"}} className = "settings-input"
                        onChange={(e) => updateName(e, i)} />  
                </div>
                <div className = "table-column">
                    <div className = "category-color" 
                        style = {{backgroundColor: cat.color.color}}
                        onClick = {() => selectCategory(i)} /> 
                </div>
                <div className = "delete" onClick = {() => deleteCategory(i)}>x</div>
            </div>
        )}
        <div className = "table-row" >     
            <input type="text" className = "settings-input"
                placeholder="Enter new category name" 
                onKeyDown={keyPressed} /> 
        </div>
        <div className = "table-row button submit-button" onClick = {() => props.update("categories", categories.slice(1))}>
            Submit Changes
        </div>
    </div>)
}   

export default CategoryEditor;