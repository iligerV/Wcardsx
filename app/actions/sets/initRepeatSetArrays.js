// @flow
import type { Dispatch } from 'redux';
import type Context from 'Core/Context';
import type { SetData } from 'Stores/SetsStore.flow';

import readSetDataAction from 'Actions/sets/readSetData';
import setCurrListHash from 'Actions/sets/setCurrListHash';
import dispatchAction from 'Core/dispatchAction';
import shuffle from 'Actions/sets/shuffle';
import {
    SET_CURRENT_ITERATION_SET_INDEX,
    SET_CURRENT_ITERATION_SET,
    SET_CURRENT_SET_RIGHT,
    SET_CURRENT_SET_WRONG,
} from 'Actions/constants/words';

const initRepeatSetArrays = (currSetId: string) => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    context.executeAction(readSetDataAction, currSetId)
        .then((currentSetData: SetData[]) =>
        {
            const autoShuffle = getState().SetsStore.autoShuffle;
            const correctWords = currentSetData.filter(word => !word.error);

            context.executeAction(setCurrListHash, currentSetData);
            dispatchAction(dispatch, SET_CURRENT_ITERATION_SET_INDEX, 0);
            dispatchAction(dispatch, SET_CURRENT_ITERATION_SET, correctWords);
            dispatchAction(dispatch, SET_CURRENT_SET_RIGHT, []);
            dispatchAction(dispatch, SET_CURRENT_SET_WRONG, []);

            autoShuffle && context.executeAction(shuffle);
        });
};

export default initRepeatSetArrays;
