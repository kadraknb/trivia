import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/game" exact component={ Game } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}
