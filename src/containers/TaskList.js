import React, {useState, useEffect, useContext} from 'react';
import TaskEditor from '.././components/Editors/TaskEditor';
import './lists.css';
//import TaskItem from 'TaskItem';
 
const TaskList = (props) => {
 /*   useEffect(() => {
        Initializate();}, []
      );
 */
    const [editMode, seteEditMode] = useState(false);
    const [tasks, setTasks] = useState([]);


    const handleTaskClick = (level) => {
    }

       
 
    return (
        <div id = "tasklist" className = "container">
            <div className = "add-button"><i class="fas fa-plus"></i></div>
            <div className = "edit-button"><i class="fas fa-pen"></i></div>
            {//tasks.map(task =>
               // <TaskItem onTaskClick = {(level) => handleTaskClick(level)}
                    
         //</div></div>       /> ) 
        }
        </div>
    )
}
 
export default TaskList;