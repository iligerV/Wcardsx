// @flow
import type { Dispatch } from 'redux';
import type Context from 'Core/Context';
import type { SetsStore } from 'Stores/SetsStore.flow';

import { LANG_FOREIGN, LANG_RU } from 'Stores/constants/setsStore';

import setCurrListHash from 'Actions/sets/setCurrListHash';
import dispatchAction from 'Core/dispatchAction';
import {
    TOGGLE_LANGUAGE,
} from 'Actions/constants/words';

const toggleLanguage = () => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const {
        language,
        currentIterationSet,
    } = setsStore;

    dispatchAction(dispatch, TOGGLE_LANGUAGE, language === LANG_FOREIGN ? LANG_RU : LANG_FOREIGN);
    context.executeAction(setCurrListHash, currentIterationSet);
};

export default toggleLanguage;
