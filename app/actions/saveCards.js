// @flow
import type { Dispatch } from 'redux';
import type { Card } from 'Types/trelloStore.flow';

import {
    SAVE_CARDS,
} from 'Constants/trelloConstants';
import dispatchAction from '../core/dispatchAction';


const saveCards = (dispatch: Dispatch) => (payload: { id: string, cards: Card[]}) =>
{
    dispatchAction(dispatch, SAVE_CARDS, payload);
};

export default saveCards;
