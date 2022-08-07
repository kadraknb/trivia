import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {   
    it('verifica se tela de login é exibida corretamente', () => {
        renderWithRouterAndRedux(<Login />)

        const btnEmail = screen.getByTestId('btn-play');
        const btnSettings = screen.getByTestId('btn-settings');

        expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
        expect(btnEmail).toBeInTheDocument();
        expect(btnEmail).toBeDisabled();
        expect(btnSettings).toBeInTheDocument();
      
    });
    it('verifica se é verificado o formato padrão de e-mail:', () => {
        renderWithRouterAndRedux(<Login />)

        const playButton = screen.getByTestId('btn-play');

        const userInputName = screen.getByTestId('input-player-name');
        userEvent.type(userInputName, 'Michel');
        const userInputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(userInputEmail, 'some');
       
        expect(playButton).toBeDisabled();
        
        userEvent.type(userInputEmail, 'some@some.com');       
        expect(playButton).not.toBeDisabled();   
    
    })
    it('verifica se é verificado o formato padrão de nome:', () => {
        renderWithRouterAndRedux(<Login />)

        const userInputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputName = screen.getByTestId('input-player-name');
        userEvent.type(userInputName, '');

        const playButton = screen.getByTestId('btn-play');     
        
        expect(playButton).toBeDisabled();
    })
    it('verifica se é verificado o botão de login é habilitado quando e-mail e password atendem aos requisitos:', () => {
         renderWithRouterAndRedux(<Login />)

        const userInputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputName = screen.getByTestId('input-player-name');
        userEvent.type(userInputName, 'Michel');

        const playButton = screen.getByTestId('btn-play');     
        
        expect(playButton).not.toBeDisabled();
    })
    it('verifica se ao clicar no botão de login, o usuário é redirecionado para outra página:', async () => {
        renderWithRouterAndRedux(<App />)

        const userInputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputName = screen.getByTestId('input-player-name');
        userEvent.type(userInputName, 'Michel');

        const playButton = screen.getByTestId('btn-play');       
        userEvent.click(playButton);       

        
        await waitFor(() => expect(screen.getByTestId(/answer-options/i)).toBeInTheDocument(), {timeout: 3000});
    });
    it('verifica se ao clicar no botão de Configurações, o usuário é redirecionado para a página correspondente:', async () => {
        renderWithRouterAndRedux(<App />)

        const userInputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputName = screen.getByTestId('input-player-name');
        userEvent.type(userInputName, 'Michel');

        const playButton = screen.getByTestId('btn-settings');       
        userEvent.click(playButton);       

        
        await waitFor(() => expect(screen.getByTestId(/settings/i)).toBeInTheDocument(), {timeout: 3000});
    });
})
