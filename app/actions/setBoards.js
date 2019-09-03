// @flow
import type { Dispatch } from 'redux';
import type { Board } from 'Types/trelloStore.flow';

import {
    SET_BOARDS,
} from 'Constants/trelloConstants';
import dispatchAction from '../core/dispatchAction';


const setBoards = (dispatch: Dispatch) => (boards: Board[]) =>
{
    dispatchAction(dispatch, SET_BOARDS, boards);
};

export default setBoards;
