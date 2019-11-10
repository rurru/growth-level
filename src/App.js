import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RoutedTabs, NavTab } from "react-router-tabs";
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
  const [xp, setXp] = useState(37);
  const [progress, setProgress] = useState({current: 0, toLevel: 100});
  const [level, setLevel] = useState(1);
  const [multiplier, setMultiplier] = useState(2); //1 = fast, 2 = balanced, 3 = slow
  const [levelXP, setLevelXP] = useState(200);
  const [categories, setCategories] = useState([{name: "Test", color: categoryColors[0]}, {name: "Test2", color: categoryColors[1]}]);


  useEffect(() => {
    updateXP(0);}, []
  );

  const calcXpToLevel = () => {
    Math.round(multiplier * 100 * (Math.pow(level, 3)));
  }

  const updateXP = (points) => {
    let newXP = xp + points;
    
    if (newXP > levelXP) {
      setLevel(level => level + 1);
      setLevelXP(calcXpToLevel());
      newXP -= levelXP;
    }

    setXp(newXP);
    let xpPercent = (xp * 100) / levelXP;
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
              <QuestLog {...props} update = {(p) => updateXP(p)} level = {level} />} />
            <Route path="/rewardlist" render={props => 
              <RewardList {...props} />} />
            <Route exact path="/tasklist" render={props => 
              <TaskList {...props} update = {(p) => updateXP(p)} level = {level} />} />
            <Redirect exact from="/" to="taskList" />
          </Switch>
        </Suspense>
      </div>
    </div>);
}

export default App;