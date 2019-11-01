import React, {useState, useEffect, useContext} from 'react';
//import TaskItem from 'TaskItem';
 
const TaskList = (props) => {
 /*   useEffect(() => {
        Initializate();}, []
      );
 */
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);


    const handleTaskClick = (level) => {
    }

       
 
    return (
        <div id = "tasklist" className = "container">
            dadfddfafdasdfas
            {//tasks.map(task =>
               // <TaskItem onTaskClick = {(level) => handleTaskClick(level)}
                    
         //</div></div>       /> ) 
        }
        </div>
    )
}
 
export default TaskList;