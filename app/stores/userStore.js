// @flow

import type { Action, UserStore } from 'Types/store.flow';

import { DETECT_MOBILE } from 'Actions/constants/tracking';
import {
    SESSION_AUTHORIZE_SUCCESS,
    SESSION_AUTHORIZE_FAIL,
} from '../constants/loginPageConstants';

const initialState: UserStore = {
    // todo: унести в константы
    appKey: 'ba448235518a8e58003896aecc9c3b57',
    // todo: переделать на вызов экшена
    token: window.localStorage.getItem('trello_token'),
    authorized: Boolean(window.localStorage.getItem('trello_token')),
    isMobile: false,
};

export default function pageStore(state: UserStore = initialState, action: Action)
{
    switch (action.type)
    {
        case SESSION_AUTHORIZE_SUCCESS:
            return { ...state, authorized: true, token: action.payload };
        case SESSION_AUTHORIZE_FAIL:
            return { ...state, authorized: false };
        case DETECT_MOBILE:
            return { ...state, isMobile: action.payload };
        default:
            return state;
    }
}
