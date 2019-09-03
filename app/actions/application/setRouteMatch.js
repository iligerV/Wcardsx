// @flow
import type { Dispatch } from 'redux';
import type { ActionBase, ActionProto } from 'Types/common';
import type { Match } from 'Stores/ApplicationStore.flow';

import { ROUTE_MATCH } from 'Actions/constants/application';

import dispatchAction from 'Core/dispatchAction';

const setRouteMatch: ActionProto<Match, null> = (
    match: Match
): ActionBase<null> => (dispatch: Dispatch) => {
    dispatchAction(dispatch, ROUTE_MATCH, match);

    return Promise.resolve(null);
};

export default setRouteMatch;
