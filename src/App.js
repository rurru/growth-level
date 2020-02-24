import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RoutedTabs, NavTab } from "react-router-tabs";
import Firebase from 'firebase';
import _ from 'lodash';
import XPBar from './components/XPBar';
import NavBar from './components/UI/NavBar';
import MainMenu from './components/UI/MainMenu';
import Message from './components/UI/Message';
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
  const [paths, setPaths] = useState({0: {name: "Default"}, 1: {name: "My Path", categories: ["1", "2"]}});
  const [currentPath, setCurrentPath] = useState(0);
  const [message, setMessage] = useState({content: "", type: ""});
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState({current: 0, toLevel: 100});
  const [levelInfo, setLevelInfo] = useState({level: 1, levelXP: 400});
  const [multiplier, setMultiplier] = useState(2); //1 = fast, 2 = balanced, 3 = slow
  const [categories, setCategories] = useState([{id: 0, name: "None", color: {color:"#fff", font: "#000"}},
                                                {id: 1, name: "Test", color: categoryColors[3]}, 
                                                {id: 2, name: "Test2", color: categoryColors[11]}]);  
  useEffect(() => {
    if (!Firebase.apps.length)
      Firebase.initializeApp(config);
  }, []);
  
  const loadUserData = () => {
  }

  const calcXpToLevel = (level) => {
    return Math.round(multiplier * 50 * (Math.pow(level, 2)) + 200);
  }

  const updateXP = (points) => {
    let newXP = xp + points;
    if (newXP > levelInfo.levelXP) {
      setLevelInfo((levelInfo) => ({
        level: levelInfo.level + 1,
        levelXP: calcXpToLevel(levelInfo.level + 1)
      }) );
      newXP -= levelInfo.levelXP;
    }
    setXp(newXP);
    let xpPercent = (newXP * 100) / levelInfo.levelXP;
    setProgress({current: xpPercent, toLevel: 100 - xpPercent});
  }

  useEffect(() => {
    updateXP(0);}, []
  );
  
  const changeSettings = (setting, value) => {
    switch (setting) {
      case "speed": 
        const speeds = ["Fast", "Balanced", "Slow"];
        setMultiplier(value + 1);
        setMessage({content: "Leveling speed is now "+speeds[value]+".", type: "notification"});
        break;
      case "categories":
        setCategories(value);
        setMessage({content: "Categories have been updated!", type: "notification"});
        break;
      case "paths":
        setPaths(value);
        setMessage({content: "Paths have been updated!", type: "notification"});
        break;
      case "path":
        setCurrentPath(value);
        setMessage({content: "Current path switched to "+paths[value].name+".", type: "notification"});
      default: break;
    }
  }

  return (
    <div id = "app">
      <NavBar level={levelInfo.level}>
        <MainMenu
          paths={paths}
          categories={categories}
          update={(setting, value) => changeSettings(setting, value)} />
      </NavBar>
      {message.content !== "" ? 
        <Message content = {message} 
          clear = {() => {setMessage({content: "", type: ""})}} /> 
        : null }
      <XPBar xp={xp} progress={progress} xpToLevel={levelInfo.levelXP} />
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
              <QuestLog {...props} update = {(p) => updateXP(p)} levelInfo = {levelInfo} />} />
            <Route path="/rewardlist" render={props => 
              <RewardList {...props} />} />
            <Route exact path="/tasklist" render={props => 
              <TaskList {...props} update={(p) => updateXP(p)} levelInfo={levelInfo} 
                path={paths[currentPath]} categories={categories} user={userID} />} />
            <Redirect exact from="/" to="taskList" />
          </Switch>
        </Suspense>
      </div>
    </div>);
}

export default App;
