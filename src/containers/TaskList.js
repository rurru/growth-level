import React, {useState, useEffect, useContext} from 'react';
import Popup from "reactjs-popup";
import Firebase from 'firebase';
import _ from "lodash";
import TaskEditor from '.././components/Editors/TaskEditor';
import TaskItem from '../components/ListItems/TaskItem';
import config from '../Config';
import "../components/Editors/editors.css"; 
import './lists.css';
 
const TaskList = (props) => { 
    const level = props.levelInfo.level;
    const categories = props.categories;

    const [editingTask, setEditingTask] = useState(0);
    const [editMode, setEditMode] = useState("default");
    const [editModeStyle, setEditModeStyle] = useState({});
    const [tasks, setTasks] = useState([{
        id: 0, name: "", category: 0, icon: "fas fa-home", 
        level: level, auto: false}]);
 
//Need to restructure data so we can retrieve by category
//Actually, never mind.  Let's pull in all the tasks and then filter them in the app code
     useEffect(() => {        
        if (!Firebase.apps.length)
            Firebase.initializeApp(config); 
        getTasks().then(t => {
            const savedTasks = _.keys(t).map(i =>
                {return {
                    id: i, 
                    name: t[i].name, 
                    category: t[i].category, 
                    icon: t[i].icon,
                    level: t[i].level,
                    auto: t[i].auto
                  } }
             );
                
  //          setTasks(_.cloneDeep(savedTasks));
        });
    }, []);

    const getTasks = async () => {
        var taskRef = Firebase.database().ref('tasks/');
        var taskItems = await taskRef.once('value');
        return taskItems.val();
    }

    const toggleEditMode = () => {
        if (editMode != "edit") {
            setEditMode("edit");
            setEditModeStyle({boxShadow: "-5px 5px 10px #ccc inset"} );
        } else {
            setEditMode("default");
            setEditingTask(0);
            setEditModeStyle({});
        }
    }

    const saveTask = (task) => {
        const newTasks = _.cloneDeep(tasks);
        if (task.id === 0) {
            task.id = tasks.length === 0 ? 1 : tasks[tasks.length-1].id + 1;
            newTasks.push(task);           
            setEditMode("default");
        } else {
            const i = _.findIndex(tasks, ['id', task.id]);
            newTasks[i] = _.cloneDeep(task);
        }
        setTasks(_.cloneDeep(newTasks));
        setEditingTask(0);
    }

    const cancelEdit = () => {
        if (editMode=="new") {
            setEditMode("default");
        }
        setEditingTask(0);
    }

    const handleTaskClick = (val) => {
        if (editMode=="edit") {
            setEditingTask(val);
        } else {
            props.update(5*val+20);
        }
    }    

    return (
        <div id = "tasklist" className = "container">
            <div className = "add-button" onClick = {() => setEditMode("new")}>
            <Popup open = {editMode == "new" || editingTask > 0} 
                  contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
                <div className = "modal" >
                    <TaskEditor task = {tasks[_.findIndex(tasks, ['id', editingTask])]} 
                        categories = {categories}
                        cancel = {() => cancelEdit()}
                        save = {saveTask}
                        />
                </div>
            </Popup>
                <i className="fas fa-plus"></i>
            </div>
            <div className = "edit-button" onClick={() => toggleEditMode()} style = {editModeStyle} >
                <i className="fas fa-pen"></i>
            </div>
            {_.tail(tasks).filter(t=>_.includes(props.path.categories, t.category)).map(task =>
                <TaskItem {...task} 
                    key = {task.id}
                    color={ categories[_.findIndex(categories, ['id', Number(task.category)])].color}
                    editing={editMode=="edit"}
                    onTaskClick={() => handleTaskClick(editMode=="edit"?task.id:task.level)} />
                ) 
            }
        </div>
    )
}
 
export default TaskList;
