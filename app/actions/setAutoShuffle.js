// @flow
import type { Dispatch } from 'redux';

import dispatchAction from 'Core/dispatchAction';
import { SET_AUTO_SHUFFLE } from 'Actions/constants/readSets';

function setAutoShuffle(flag: boolean)
{
    return (dispatch: Dispatch) =>
    {
        dispatchAction(dispatch, SET_AUTO_SHUFFLE, flag);
    };
}

export default setAutoShuffle;
