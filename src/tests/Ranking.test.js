import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import rootReducer from '../redux/reducers';

import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Página de Ranking', () => {
  it.skip('verifica se as alternativas são automaticamente desabilitadas após o timer zerar:', async () => {
    renderWithRouterAndRedux(<App />)

    const userInputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(userInputEmail, 'some@some.com');

    const userInputName = screen.getByTestId('input-player-name');
    userEvent.type(userInputName, 'Michel');

    const playButton = screen.getByTestId('btn-play');
    userEvent.click(playButton);

    await waitFor(() => expect(screen.getByTestId(/countdown/i)).toBeInTheDocument(), { timeout: 3000 });

    const correctButton = screen.getByTestId('correct-answer');
 
    userEvent.click(correctButton);

    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 2000 });
    const nextButton = screen.getByTestId('btn-next');
    userEvent.click(nextButton);

    userEvent.click(correctButton);
    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 2000 });
    userEvent.click(nextButton);

    userEvent.click(correctButton);
    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 2000 });
    userEvent.click(nextButton);

    userEvent.click(correctButton);
    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 2000 });
    userEvent.click(nextButton);

    userEvent.click(correctButton);
    await waitFor(() => expect(correctButton).toBeDisabled(), { timeout: 2000 });
    userEvent.click(nextButton);

 

    await waitFor(() => expect(screen.getByTestId(/feedback-total-score/i)).toBeInTheDocument(), { timeout: 3000 });



    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);
    
    

    await waitFor(() => expect(screen.getByTestId(/ranking-title/i)).toBeInTheDocument(), { timeout: 3000 });
    await waitFor(() => expect(screen.getByTestId(/player-score-0/i)).toBeInTheDocument(), { timeout: 3000 });
    
    const playerImag = screen.getByRole('img');
    await waitFor(() => expect(playerImag).toBeInTheDocument(), { timeout: 3000 }); 

    const gohomeButton = screen.getByTestId('btn-go-home');
    userEvent.click(gohomeButton);

    await waitFor(() => expect(screen.getByTestId(/input-player-name/i)).toBeInTheDocument(), { timeout: 3000 });

  });

  it('se esta em ordem', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    localStorage.clear()
    const arrRanks = [['https://www.gravatar.com/avatar/26f716bfba89b71dc1f67cb893a21867', 'primeiro', 142],
    ['https://www.gravatar.com/avatar/26f716bfba89b71dc1f67cb893a21867', 'segundo', 108],
    ['https://www.gravatar.com/avatar/26f716bfba89b71dc1f67cb893a21867', 'ultimo', 97],]
    localStorage.setItem('ranking', JSON.stringify(arrRanks))
    history.push('/ranking')
    
    expect(screen.getAllByTestId(/player-name/i).length).toBe(3)
    expect(screen.getByTestId('player-name-0').innerHTML).toBe('primeiro')
    expect(screen.getByTestId('player-name-2').innerHTML).toBe('ultimo')

  })

  it('buttom home', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
    localStorage.clear()
    const arrRanks = [['https://www.gravatar.com/avatar/26f716bfba89b71dc1f67cb893a21867', 'primeiro', 142]]
    localStorage.setItem('ranking', JSON.stringify(arrRanks))
    history.push('/ranking')

    userEvent.click(screen.getByTestId('btn-go-home'));
    expect(history.location.pathname).toBe('/')

  })

})


