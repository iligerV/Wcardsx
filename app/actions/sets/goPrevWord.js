// @flow
import type { Dispatch } from 'redux';
import type { SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import {
    SET_CURRENT_ITERATION_SET_INDEX,
} from 'Actions/constants/words';

const goPrevWord = () => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const { currentIterationSetIndex: index } = setsStore;
    const prevIndex = index > 0 ? index - 1 : index;

    dispatchAction(dispatch, SET_CURRENT_ITERATION_SET_INDEX, prevIndex);
};

export default goPrevWord;
