import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}
