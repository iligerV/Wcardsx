// @flow
import type { Action } from './store.flow';
import type { ApplicationStore, Match } from './ApplicationStore.flow';

import { ROUTE_MATCH, NODE_ENV } from '../actions/constants/application';

export const EMPTY_MATCH: Match = {
    path: '',
    params: {
        id: '',
    },
};

const initialState: ApplicationStore = {
    routeMatch: EMPTY_MATCH,
    nodeEnv: {},
};

export default function pageStore(
    state: ApplicationStore = initialState,
    action: Action
) {
    switch (action.type) {
        case ROUTE_MATCH:
            return { ...state, routeMatch: action.payload };

        case NODE_ENV:
            return { ...state, nodeEnv: action.payload };

        default:
            return state;
    }
}
