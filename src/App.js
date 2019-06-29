import React, { useEffect, useContext, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './context/context';
import XPBar from './components/XPBar';
import TaskList from './containers/TaskList'

const QuestLog = React.lazy(() => {
  return import('./containers/QuestLog');
});

const RewardList = React.lazy(() => {
  return import('./containers/RewardList');
});

const App = (props) => {
  useEffect(
    () => {return "tobecompletedlater";}
  );

  return (
  <AppContext.Provider>
    <XPBar />
    <Suspense fallback = {<p>Loading Tasks...</p>} >
      <Switch>
        <Route path="questlog" render={props => <QuestLog />} />
        <Route path="rewardList" render={props => <RewardList />} />
        <Route path="taskList" render={props => <TaskList />} />
        <Redirect to="taskList" />
      </Switch>
    </Suspense>
  </AppContext.Provider>);
}

export default App;