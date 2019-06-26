import React, { useEffect, useContext, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './context/context.js';

const TaskList = React.lazy(() => {
  return import('./containers/TaskList/TaskList');
});

const QuestLog = React.lazy(() => {
  return import('./containers/QuestLog/QuestLog');
});

const RewardList = React.lazy(() => {
  return import('./containers/RewardList/RewardList');
});

const app = props => {
  return (<div></div>);
}

export default app;