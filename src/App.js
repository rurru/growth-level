import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import XPBar from './components/XPBar';
import NavBar from './components/UI/NavBar';
import TaskList from './containers/TaskList';
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
      <Switch>
        <Route path="/questlog" render={props => 
          <QuestLog {...props} update = {(p) => updateXP(p)} level = {level} />} />
        <Route path="/rewardList" render={props => 
          <RewardList {...props} />} />
        <Route exact path="/" render={props => 
          <TaskList {...props} update = {(p) => updateXP(p)} level = {level} />} />
      </Switch>
    </div>);
}

export default App;