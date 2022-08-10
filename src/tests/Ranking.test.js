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


