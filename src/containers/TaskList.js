import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import TaskEditor from '.././components/Editors/TaskEditor';
//import TaskItem from 'TaskItem';
import "../components/Editors/editors.css"; 
import './lists.css';
 
const TaskList = (props) => {
 /*   useEffect(() => {
        Initializate();}, []
      );
 */
    const [editingTask, setEditingTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editModeStyle, setEditModeStyle] = useState({});

    const toggleTaskEditor = () => {
        const editorOpen = !editingTask;
        setEditingTask(editorOpen);
    }

    const toggleEditMode = () => {
        const newEditMode = !editMode;
        setEditMode(newEditMode);

        const buttonStyle = newEditMode ? 
            {boxShadow: "-5px 5px 10px #ccc inset"}  : {};
        setEditModeStyle(buttonStyle);
    }

    const handleTaskClick = (level) => {
    }

       
 
    return (
        <div id = "tasklist" className = "container">
            <div className = "add-button" onClick = {() => toggleTaskEditor()}>
            <Popup open = {editingTask} 
                  contentStyle = {{width: "auto"}}>
                <div className = "modal" >
                    <TaskEditor name = "" categoryID = {0}  />
                </div>
            </Popup>
                <i className="fas fa-plus"></i>
            </div>
            <div className = "edit-button" onClick={() => toggleEditMode()} style = {editModeStyle} >
                <i className="fas fa-pen"></i>
            </div>

            {//tasks.map(task =>
               // <TaskItem onTaskClick = {(level) => handleTaskClick(level)}
                    
         //</div></div>       /> ) 
        }
        </div>
    )
}
 
export default TaskList;