import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import rootReducer from '../redux/reducers';

import App from '../App';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
  it('verifica se ao clicar no botão de Configurações, o usuário é redirecionado para a página correspondente:', async () => {
    const initialStateMock = {
      player: {
        assertions: 4,
        score: 0,
      },
      game: [
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question: "What is the first weapon you acquire in Half-Life?",
          correct_answer: "A crowbar",
          incorrect_answers: [
            "A pistol",
            "The H.E.V suit",
            "Your fists"
          ]
        }
      ]
    };
    const store = createStore(rootReducer, initialStateMock);
    renderWithRouterAndRedux(<App />,
    {
      initialState: initialStateMock,
    })

    const userInputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(userInputEmail, 'some@some.com');

    const userInputName = screen.getByTestId('input-player-name');
    userEvent.type(userInputName, 'Michel');

    const playButton = screen.getByTestId('btn-play');
    userEvent.click(playButton);


    await waitFor(() => expect(screen.getByTestId(/countdown/i)).toBeInTheDocument(), { timeout: 3000 });
    await waitFor(() => expect(screen.getByTestId(/question-category/i)).toBeInTheDocument(), { timeout: 3000 });
    await waitFor(() => expect(screen.getByTestId(/correct-answer/i)).toBeInTheDocument(), { timeout: 3000 });
    await waitFor(() => expect(screen.getByTestId(/wrong-answer-0/i)).toBeInTheDocument(), { timeout: 3000 });

    const correctButton = screen.getByTestId('correct-answer');
    userEvent.click(correctButton);

    const nextButton = screen.getByTestId('btn-next');
    const wrongButton = screen.getByTestId('wrong-answer-0');
    const score = document.getElementById("score");
    await waitFor(() => expect(score.innerHTML).not.toBe('0'), { timeout: 3000 });

    await waitFor(() => expect(nextButton).toBeInTheDocument(), { timeout: 1000 });

    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 1000 });
    await waitFor(() => expect(wrongButton).toBeDisabled(), { timeout: 1000 });
    
    userEvent.click(nextButton);

    await waitFor(() => expect(correctButton).not.toBeDisabled(), { timeout: 3000 });
    await waitFor(() => expect(wrongButton).not.toBeDisabled(), { timeout: 3000 });

  });
  it('verifica se ao clicar no botão de Configurações, o usuário é redirecionado para a página correspondente:', async () => {
    renderWithRouterAndRedux(<App />)

    const userInputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(userInputEmail, 'some@some.com');

    const userInputName = screen.getByTestId('input-player-name');
    userEvent.type(userInputName, 'Michel');

    const playButton = screen.getByTestId('btn-play');
    userEvent.click(playButton);

    await waitFor(() => expect(screen.getByTestId(/countdown/i)).toBeInTheDocument(), { timeout: 3000 });

    const correctButton = screen.getByTestId('correct-answer');
    const wrongButton = screen.getByTestId('wrong-answer-0');


    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 31000 });
    await waitFor(() => expect(wrongButton).toBeDisabled(), { timeout: 31000 });


  }, 35000);
})
