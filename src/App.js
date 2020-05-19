import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RoutedTabs, NavTab } from "react-router-tabs";
import Popup from "reactjs-popup";
import Firebase from 'firebase';
import _ from 'lodash';
import XPBar from './components/XPBar';
import NavBar from './components/UI/NavBar';
import MainMenu from './components/UI/MainMenu';
import Message from './components/UI/Message';
import LevelUpNotification from './components/Popups/LevelUpNotification';
import TaskList from './containers/TaskList';
import { categoryColors } from './constants';
import config from './Config';
import "./react-router-tabs.css";
import './App.css';

const QuestLog = React.lazy(() => {
  return import('./containers/QuestLog');
});

const RewardList = React.lazy(() => {
  return import('./containers/RewardList');
});

const App = (props) => {
  const [userID, setuserID] = useState(0);
  const [message, setMessage] = useState({content: "", type: ""});
  const [progress, setProgress] = useState({current: 0, toLevel: 100});
  const [levelXP, setLevelXP] = useState(400);
  const [leveledUp, setLeveledUp] = useState(false);
  const [multiplier, setMultiplier] = useState(2); //1 = fast, 2 = balanced, 3 = slow
  const [categories, setCategories] = useState([{id: 0, name: "None", active: false, color: {color:"#fff", font: "#000"}}]);  
  const [paths, setPaths] = useState({0: {name: "Default", level: 1, xp: 0, categories: categories, rewardsEarned: [0], id: 0}});
  const [currentPath, setCurrentPath] = useState(0);

  useEffect(() => {
    if (!Firebase.apps.length)
      Firebase.initializeApp(config);
    updateXP(0);
  }, []);
  
  const loadUserData = async () => {
    var userRef = Firebase.database().ref(userID + '/userData/');
    var userData = await userRef.once('value');
    return userData.val();
  }

  const getCategories = async () => {
      var catRef = Firebase.database().ref(userID + '/categories/');
      var cats = await catRef.once('value');
      return cats.val();
  }
  
  const getPaths = async () => {
    var pathRef = Firebase.database().ref(userID + '/paths');
    var pths = await pathRef.once('value');
    return pths.val();
  }

  const calcXpToLevel = (level) => {
    return Math.round(multiplier * 25 * (Math.pow(level, 2)) + 300);
  }

  const updateXP = (points) => {
    const newPaths = _.cloneDeep(paths);
    let pathLevel = paths[currentPath].level;
    let pathLevelXP = calcXpToLevel(pathLevel);

    let newXP = paths[currentPath].xp + points;
    if (newXP > pathLevelXP) {      
      newPaths[currentPath].rewardsEarned.push(pathLevel);
      pathLevel = paths[currentPath].level + 1;
      newXP -= pathLevelXP;
      newPaths[currentPath].level = pathLevel;
      setLeveledUp(true);
    }

    newPaths[currentPath].xp = newXP;
    changeSettings("paths", newPaths);
    setLevelXP(pathLevelXP);

    let xpPercent = (newXP * 100) / pathLevelXP;
    setProgress({current: xpPercent, toLevel: 100 - xpPercent});
    
  }

  useEffect(() => {        
    loadUserData().then(userData => {
      if (userData != null) {
        setMultiplier(userData.multiplier);
        setCurrentPath(userData.currentPath);
      }
    });                  
        
    getCategories().then(cats => {
      const savedCategories = Array.isArray(cats) ?
      cats.filter(c=>c!=null) :
      _.keys(cats).filter(c=>c!=null).map(i =>
        { return {
            id: cats[i].id,
            name: cats[i].name,
            color: cats[i].color,
            active: true
          }}
      );
      const allCategories = categories.concat(savedCategories);
      setCategories(allCategories);      
    });      
    
    let allPaths = _.cloneDeep(paths);
    getPaths().then(pths => {
      const savedPaths = Array.isArray(pths) ?
      pths.filter(p=>p!=null) :
      _.keys(pths).filter(p=>p!=null).map(i =>
        { return {
            id: pths[i].id,
            name: pths[i].name,
            level: pths[i].level,
            xp: pths[i].xp,
            categories: pths[i].categories,
            rewardsEarned: pths[i].rewardsEarned
          }}
      );      
      _.each(savedPaths, p=>allPaths[p.id] = p);     
      setPaths(allPaths);    
     });
    }, []
  );
  
  const changeSettings = (setting, value) => {
    switch (setting) {
      case "speed": 
        const speeds = ["Fast", "Balanced", "Slow"];
        setMultiplier(value + 1);
        setMessage({content: "Leveling speed is now "+speeds[value]+".", type: "notification"});
        break;
      case "categories":
        const deletedCategories = value.filter(c => c.active === false);
        const updatedCategories = value.filter(c => c.active === true);       
        setCategories(updatedCategories);
        _.each(deletedCategories, category => {
          const catRef = Firebase.database().ref(userID + "/categories/");
          catRef.child(category.id).remove();
        });        
        _.each(updatedCategories, category => {
          Firebase.database().ref(userID + "/categories/" + category.id).set({
            id: category.id,
            name: category.name,
            color: category.color,
            active: true
           });
        });
        setMessage({content: "Categories have been updated!", type: "notification"});
        break;
      case "paths":
        setPaths(value);
       // Firebase.database().ref(userID + "/paths/").remove();
        _.each(_.keys(value).slice(1), i => {
          Firebase.database().ref(userID + "/paths/" + value[i].id).set({
            id: value[i].id,
            xp: value[i].xp,
            name: value[i].name,
            level: value[i].level,
            categories: value[i].categories,
            rewardsEarned: value[i].rewardsEarned
           });
        });
        break;
      case "path":
        setCurrentPath(value);
        const pathLevelXP = calcXpToLevel(paths[value].level);
        const xpPercent = (paths[value].xp * 100) / pathLevelXP;
        setLevelXP(pathLevelXP);
        setProgress({current: xpPercent, toLevel: 100 - xpPercent});
        setMessage({content: "Current path switched to "+paths[value].name+".", type: "notification"});
        break;
      case "rewards":
        const id = paths[currentPath].id;
        const updatedPath = {
          id: id,
          xp: paths[currentPath].xp,
          level: paths[currentPath].level,
          name: paths[currentPath].name,
          categories: paths[currentPath].categories,
          rewardsEarned: value
        }

        Firebase.database().ref(userID + "/paths/" + id).set({...updatedPath});

        break;
      default: break;
    }
  }

  return (
    <div id = "app">
      <NavBar level={paths[currentPath].level}>
        <MainMenu
          paths={paths}
          categories={categories}
          update={(setting, value) => changeSettings(setting, value)} />
      </NavBar>
      {message.content !== "" ? 
        <Message content = {message} 
          clear = {() => {setMessage({content: "", type: ""})}} /> 
        : null }
      <XPBar xp={paths[currentPath].xp} progress={progress} xpToLevel={levelXP} />

      <Popup open = {leveledUp == true} 
          contentStyle = {{width: "auto"}} closeOnDocumentClick = {false} >
            <div className = "modal" >
              <LevelUpNotification level={paths[currentPath].level} close={() => setLeveledUp(false)} />
            </div>
        </Popup>

      <div id = "list">
        <div className = "tab-row">
          <NavTab to="/tasklist">Tasks</NavTab>
          <NavTab to="/questlog">Quests</NavTab>
          <NavTab to="/rewardlist">Rewards</NavTab>
          <span id = "tab-border"></span>
        </div>
        <Suspense fallback = {<p>Loading Tasks...</p>} >
          <Switch>        
            <Route path="/questlog" render={props => 
              <QuestLog {...props} update = {(p) => updateXP(p)} />} />
            <Route path="/rewardlist" render={props => 
              <RewardList {...props} level={paths[currentPath].level} user={userID} earned={paths[currentPath].rewardsEarned} 
                update={(s,v) => changeSettings(s,v)} updateMessage={(m)=>setMessage(m)} />} />
            <Route exact path="/tasklist" render={props => 
              <TaskList {...props} update={(p) => updateXP(p)} level={paths[currentPath].level}
                path={paths[currentPath]} categories={categories} user={userID} />} />
            <Redirect exact from="/" to="taskList" />
          </Switch>
        </Suspense>
      </div>
    </div>);
}

export default App;
