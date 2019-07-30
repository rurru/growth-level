import React, { useEffect, useContext, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './context/context';
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
  useEffect(
    () => {"tobecompletedlater";}
  );

  return (
  <AppContext.Provider>
    <div id = "app">
      <NavBar />
      <XPBar />
      <Suspense fallback = {<p>Loading Tasks...</p>} >
        <Switch>
          <Route path="questlog" render={props => <QuestLog />} />
          <Route path="rewardList" render={props => <RewardList />} />
          <Route path="taskList" render={props => <TaskList />} />
          <Redirect to="taskList" />
        </Switch>
      </Suspense>
    </div>
  </AppContext.Provider>);
}

export default App;