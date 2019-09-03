// @flow
import md5 from 'js-md5';
import type { Dispatch } from 'redux';
import type { SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import { SET_CURRENT_LISH_HASH } from 'Actions/constants/words';

const setCurrListHash = currSet => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const { language } = setsStore;
    const hashCurrSet = md5(JSON.stringify(currSet) + language);

    dispatchAction(dispatch, SET_CURRENT_LISH_HASH, hashCurrSet);
};

export default setCurrListHash;
