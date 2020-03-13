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
    const defaultColor = {font: "#fff", color: "#000"}

    const [editingTask, setEditingTask] = useState(0);
    const [editMode, setEditMode] = useState("default");
    const [editModeStyle, setEditModeStyle] = useState({});
    const [categories, setCategories] = useState(props.categories);
    const [tasks, setTasks] = useState([{
        id: 0, name: "", category: 0, icon: "fas fa-home", 
        level: level, auto: false, userID: props.user}]); 

     useEffect(() => {        
        if (!Firebase.apps.length)
            Firebase.initializeApp(config); 
        getTasks().then(tsk => {                      
            const savedTasks = Array.isArray(tsk) ?
            tsk.filter(t=>t!=null) :
            _.keys(tsk).filter(t=>t!=null).map(t =>
                { return {
                    userID: tsk[t].userID,
                    id: tsk[t].id, 
                    name: tsk[t].name, 
                    category: tsk[t].category, 
                    icon: tsk[t].icon,
                    level: tsk[t].level,
                    auto: tsk[t].auto
                  } }
             );

             const loadedTasks = tasks.concat(savedTasks);
              setTasks(_.cloneDeep(loadedTasks));
        });
    }, []);

    const getTasks = async () => {
        var taskRef = Firebase.database().ref(props.user + '/tasks/');
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
   
        Firebase.database().ref(task.userID + '/tasks/' + task.id).set({
            id: task.id,
            name: task.name, 
            category: task.category, 
            icon: task.icon,
            level: task.level,
            auto: task.auto
          });

        setTasks(_.cloneDeep(newTasks));
        setEditingTask(0);
    }

    const deleteTask = (id) => {
        const taskRef = Firebase.database().ref(props.user + '/tasks/');
        taskRef.child(id).remove();
        const newTasks = _.pullAllBy(tasks, [{ 'id': id }], 'id');
        setTasks(newTasks);
        toggleEditMode();
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
                        user = {props.user}
                        cancel = {() => cancelEdit()}
                        save = {saveTask}
                        delete = {deleteTask}
                        />
                </div>
            </Popup>
                <i className="fas fa-plus"></i>
            </div>
            <div className = "edit-button" onClick={() => toggleEditMode()} style = {editModeStyle} >
                <i className="fas fa-pen"></i>
            </div>
            {_.tail(tasks).filter(t=>props.path.name=="Default" || 
                _.includes(props.path.categories.map(c=>c.id), t.category))
                 .map(task =>
                    <TaskItem {...task} 
                        key = {task.id}
                        color={(Array.isArray(props.categories)) ? categories[task.category].color : defaultColor } 
                        editing={editMode=="edit"}
                        onTaskClick={() => handleTaskClick(editMode=="edit"?task.id:task.level)} />
                ) 
            }
        </div>
    )
}
 
export default TaskList;
