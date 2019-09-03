// @flow
import type { Dispatch } from 'redux';
import type { SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import {
    REVERT_TO_LIST,
} from 'Actions/constants/words';

const revertToList = (list: string, index: number) => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const { currentIterationSet: set } = setsStore;
    const storeList = [...setsStore[list]];

    set.push(storeList.splice(index, 1)[0]);

    dispatchAction(dispatch, REVERT_TO_LIST, {
        [list]: storeList,
        currentIterationSet: [...set],
    });
};

export default revertToList;
