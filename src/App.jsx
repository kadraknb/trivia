import React, { useState } from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import './app.css';

export default function Trivia() {
  const [router, setRouter] = useState('Login');
  const routers = {
    Login: <Login router={setRouter} />,
    Game: <Game router={setRouter} />,
    Feedback: <Feedback router={setRouter} />,
    Ranking: <Ranking router={setRouter} />,
  };
  return (
    <Provider store={store}>
      <div id="main_body">
        <div id="TRI_body">{routers[router]}</div>
      </div>
    </Provider>
  );
}
