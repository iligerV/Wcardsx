// @flow
import merge from '@tinkoff/utils/object/merge';

import type { Action } from 'Types/store.flow';
import {
    PARSE_URL,
} from 'Actions/constants/tracking';

import type { TrackingStore } from './TrackingStore.flow';

export const initialState: TrackingStore = {
    url: {
        query: {},
    },
};

// eslint-disable-next-line complexity
export default function trackingStore(state: TrackingStore = initialState, action: Action)
{
    switch (action.type)
    {
        case PARSE_URL:
            return merge(state, { url: action.payload });


        default:
            return state;
    }
}
