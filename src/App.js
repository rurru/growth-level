import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RoutedTabs, NavTab } from "react-router-tabs";
import ReactDOM from 'react-dom';
import XPBar from './components/XPBar';
import NavBar from './components/UI/NavBar';
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
  const [paths, setPaths] = ["default"]
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
      })
      );
      newXP -= levelInfo.levelXP;
    }

    setXp(newXP);
    let xpPercent = (xp * 100) / levelInfo.levelXP;
    setProgress({current: xpPercent, toLevel: 100 - xpPercent});
  }

  return (
    <div id = "app">
      <NavBar />
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