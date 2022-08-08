import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import './index.css';

export default function App() {
  return (
    <Switch>
      <Route path="/ranking" exact component={ Ranking } />
      <Route path="/feedback" exact component={ Feedback } />
      <Route path="/settings" exact component={ Settings } />
      <Route path="/game" exact component={ Game } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}
