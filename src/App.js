import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" exact component={ Settings } />
      <Route path="/game" exact component={ Game } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}
