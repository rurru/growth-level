import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RoutedTabs, NavTab } from "react-router-tabs";
import XPBar from './components/XPBar';
import NavBar from './components/UI/NavBar';
import MainMenu from './components/UI/MainMenu';
import Message from './components/UI/Message';
import TaskList from './containers/TaskList';
import { categoryColors } from './constants';
import "./react-router-tabs.css";
import './App.css';

const QuestLog = React.lazy(() => {
  return import('./containers/QuestLog');
});

const RewardList = React.lazy(() => {
  return import('./containers/RewardList');
});

const App = (props) => {
  const [paths, setPaths] = useState(["default"]);
  const [message, setMessage] = useState({content: "", type: ""});
  const [xp, setXp] = useState(90);
  const [progress, setProgress] = useState({current: 0, toLevel: 100});
  const [levelInfo, setLevelInfo] = useState({level: 1, levelXP: 200});
  const [multiplier, setMultiplier] = useState(2); //1 = fast, 2 = balanced, 3 = slow
  const [categories, setCategories] = useState([{name: "Test", color: categoryColors[0]}, {name: "Test2", color: categoryColors[1]}]);


  useEffect(() => {
    updateXP(0);}, []
  );

  const calcXpToLevel = (level) => {
    Math.round(multiplier * 100 * (Math.pow(level, 3)));
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
    let xpPercent = (xp * 100) / levelInfo.levelXP;
    setProgress({current: xpPercent, toLevel: 100 - xpPercent});
  }


  const changeSettings = (setting, value) => {
    switch (setting) {
      case "speed": 
        let speeds = ["Slow", "Balanced", "Fast"];
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
      default: break;
    }

  }

  return (
    <div id = "app">
      <NavBar>
        <MainMenu
          update = {(setting, value) => changeSettings(setting, value)} />
      </NavBar>
      {message.type == "" ? null :
        <Message content = {message} clear = {() => setMessage({content: "", type: ""})} /> }
      <XPBar progress = {progress} />
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
              <TaskList {...props} update = {(p) => updateXP(p)} levelInfo = {levelInfo} />} />
            <Redirect exact from="/" to="taskList" />
          </Switch>
        </Suspense>
      </div>
    </div>);
}

export default App;