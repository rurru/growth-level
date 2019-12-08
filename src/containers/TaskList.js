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
            <div className = "add-button" onClick = {() => setEditingTask(true)}>
            <Popup open = {editingTask} onClose = {() => toggleTaskEditor(false)}
                  contentStyle = {{width: "auto"}}>
                <div className = "modal" >
                    <TaskEditor />
                </div>
            </Popup>
                <i className="fas fa-plus"></i>
            </div>
            <div className = "edit-button" onClick={() => toggleEditMode()}>
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