// @flow
import type { Dispatch } from 'redux';
import type { SetData, SetsStore } from 'Stores/SetsStore.flow';
import type Context from 'Core/Context';

import dispatchAction from 'Core/dispatchAction';
import shuffle from 'Actions/sets/shuffle';
import {
    LOAD_REMEMBER_LATER,
} from 'Actions/constants/words';

const loadRememberLater = () => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const {
        currentIterationSet: set,
        currentSetRight: right,
        currentSetWrong: wrong,
        autoShuffle,
    } = setsStore;

    const currentIterationSet: SetData[] = [...wrong];
    const currentSetRight: SetData[] = [...right, ...set];
    const currentSetWrong: SetData[] = [];
    const currentIterationSetIndex = 0;

    dispatchAction(dispatch, LOAD_REMEMBER_LATER, {
        currentIterationSet,
        currentIterationSetIndex,
        currentSetRight,
        currentSetWrong,
    });
    autoShuffle && context.executeAction(shuffle);
};

export default loadRememberLater;
