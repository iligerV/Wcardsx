// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import type { AuthResponse } from 'Types/types.flow';
import type { Action } from 'Types/common';

// Services
import authenticationService from 'Api/authenticationService';

// Actions
import setLogged from 'Actions/setLogged';

// Components
import LoginPage from 'Components/organisms/loginPage/LoginPage.jsx';

type Props = {
    setLogged: Action,
}

type WindowPopup = {
    close: Function
};

class PageLoginContainer extends Component<Props>
{
    _windowInstance: WindowPopup;

    componentDidMount()
    {
        window.addEventListener('message', this.getAuthToken, false);
    }

    componentWillUnmount()
    {
        window.removeEventListener('message', this.getAuthToken);
    }

    /**
     * Получает access token от Trello
     * @param payload
     */
    getAuthToken = (payload: AuthResponse) =>
    {
        if (payload.origin !== 'https://trello.com')
        {
            return;
        }

        // проверяем правильность формата токена
        if (/[0-9a-f]{64}/.test(payload.data))
        {
            window.localStorage.setItem('trello_token', payload.data);
            this._windowInstance.close();
            this.props.setLogged(true, payload.data);
        }
        else
        {
            console.error('Не удалось получить accessToken'); // eslint-disable-line no-console
        }
    };

    /**
     * Открывает попап окно для верификации на Trello
     */
    handleLogIn = () =>
    {
        authenticationService().then(windowInstance => this._windowInstance = windowInstance);
    };

    render()
    {
        return (
            <LoginPage onLogIn={this.handleLogIn} />
        );
    }
}

function mapActionsToProps(dispatch)
{
    return bindActionCreators({
        setLogged,
    }, dispatch);
}

export default connect(null, mapActionsToProps)(PageLoginContainer);
