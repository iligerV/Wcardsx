// @flow
import type { Dispatch } from 'redux';
import type Context from 'Core/Context';
import type { SetData, SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import setCurrListHash from 'Actions/sets/setCurrListHash';
import {
    REMEMBER_LATER,
} from 'Actions/constants/words';

const rememberLater = () => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const {
        currentIterationSetIndex: index,
        currentIterationSet: set,
        currentSetWrong: wrong,
    } = setsStore;

    const currentSetWrong: SetData[] = wrong.concat(set[index]);
    const currentIterationSet: SetData[] = [...set];

    currentIterationSet.splice(index, 1);
    const currentIterationSetIndex = index >= currentIterationSet.length ? currentIterationSet.length - 1 : index;

    context.executeAction(setCurrListHash, currentIterationSet);
    dispatchAction(dispatch, REMEMBER_LATER, {
        currentSetWrong,
        currentIterationSet,
        currentIterationSetIndex,
    });
};

export default rememberLater;
