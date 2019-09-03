// @flow
import merge from '@tinkoff/utils/object/merge';

import type { Action } from 'Types/store.flow';
import {
    PARSE_SETS_META,
    PARSE_CURRENT_SET_DATA,
    SAVE_RAW_SETS,
    SHUFFLE_CURRENT_SET_DATA,
    SET_AUTO_SHUFFLE,
} from 'Actions/constants/readSets';
import {
    SET_CURRENT_ITERATION_SET,
    SET_CURRENT_LISH_HASH,
    SET_CURRENT_SET_RIGHT,
    SET_CURRENT_SET_WRONG,
    TOGGLE_LANGUAGE,
    SET_CURRENT_ITERATION_SET_INDEX,
    REMEMBER_LATER,
    LOAD_REMEMBER_LATER,
    REVERT_TO_LIST,
} from 'Actions/constants/words';

import { LANG_RU } from './constants/setsStore';

import type { SetsStore } from './SetsStore.flow';

export const initialState: SetsStore = {
    autoShuffle: true,
    sets: [],
    setsMeta: [],
    language: LANG_RU,
    currentSetData: [],
    currentIterationSet: [],
    currentIterationSetHash: '',
    currentIterationSetIndex: 0,
    currentSetRight: [],
    currentSetWrong: [],
};

// eslint-disable-next-line complexity
export default function pageStore(state: SetsStore = initialState, action: Action)
{
    switch (action.type)
    {
        case PARSE_SETS_META:
            return merge(state, { setsMeta: action.payload });

        case PARSE_CURRENT_SET_DATA:
            return merge(state, { currentSetData: action.payload });

        case SAVE_RAW_SETS:
            window.localStorage.setItem('rawSets', JSON.stringify(action.payload));
            return merge(state, { sets: action.payload });

        case SET_CURRENT_ITERATION_SET:
            return merge(state, { currentIterationSet: action.payload });

        case SET_CURRENT_LISH_HASH:
            return merge(state, { currentIterationSetHash: action.payload });

        case SET_CURRENT_SET_RIGHT:
            return merge(state, { currentSetRight: action.payload });

        case SET_CURRENT_SET_WRONG:
            return merge(state, { currentSetWrong: action.payload });

        case TOGGLE_LANGUAGE:
            return merge(state, { language: action.payload });

        case SET_CURRENT_ITERATION_SET_INDEX:
            return merge(state, { currentIterationSetIndex: action.payload });

        case REMEMBER_LATER: {
            const {
                currentSetWrong,
                currentIterationSet,
                currentIterationSetIndex,
            } = action.payload;

            return merge(state, {
                currentSetWrong,
                currentIterationSet,
                currentIterationSetIndex,
            });
        }

        case LOAD_REMEMBER_LATER: {
            const {
                currentIterationSet,
                currentIterationSetIndex,
                currentSetRight,
                currentSetWrong,
            } = action.payload;

            return merge(state, {
                currentIterationSet,
                currentIterationSetIndex,
                currentSetRight,
                currentSetWrong,
            });
        }

        case REVERT_TO_LIST:
            return merge(state, action.payload);

        case SHUFFLE_CURRENT_SET_DATA:
            return merge(state, { currentIterationSet: action.payload });

        case SET_AUTO_SHUFFLE:
            return merge(state, { autoShuffle: action.payload });

        default:
            return state;
    }
}
