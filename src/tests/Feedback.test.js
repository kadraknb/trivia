import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Login from '../pages/Login';
import Feedback from '../pages/Feedback';

describe('Testa a página de Feedback', () => {
  it('Testa se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Feedback />);
    
    const img = screen.getByTestId('header-profile-picture');
    const user = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const message = screen.getByTestId('feedback-text');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');

    expect(img).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  it('Testa se o botão "Play Again" redireciona e renderiza a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o botão "Ranking" redireciona e renderiza a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)

    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking');
  })
});
