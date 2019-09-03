// @flow
import type { Dispatch } from 'redux';
import type { List } from 'Types/trelloStore.flow';

import {
    PICK_BOARD,
} from 'Constants/trelloConstants';
import dispatchAction from '../core/dispatchAction';


const pickBoard = (dispatch: Dispatch) => (payload: { id: string, lists: List[] }) =>
{
    dispatchAction(dispatch, PICK_BOARD, payload);
};

export default pickBoard;
