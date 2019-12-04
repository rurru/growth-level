import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import TaskEditor from '.././components/Editors/TaskEditor';
import './lists.css';
//import TaskItem from 'TaskItem';
 
const TaskList = (props) => {
 /*   useEffect(() => {
        Initializate();}, []
      );
 */
    const [editTask, setEditTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tasks, setTasks] = useState([]);

    const toggleTaskEditor = (editorOpen) => {

    }

    const toggleEditMode = () => {
        const newEditMode = !editMode;
        setEditMode(newEditMode);
    }

    const handleTaskClick = (level) => {
    }

       
 
    return (
        <div id = "tasklist" className = "container">
            <div className = "add-button" >
            <Popup open = {editTask} onClose = {() => toggleTaskEditor(false)}
                  contentStyle = {{width: "auto"}}>
            </Popup>
                <i class="fas fa-plus"></i>
            </div>
            <div className = "edit-button" onClick={() => toggleEditMode()}>
                <i class="fas fa-pen"></i>
            </div>

            
            Edit mode is {editMode ? "on" : "off"}
            {//tasks.map(task =>
               // <TaskItem onTaskClick = {(level) => handleTaskClick(level)}
                    
         //</div></div>       /> ) 
        }
        </div>
    )
}
 
export default TaskList;