// @flow
import type { Dispatch } from 'redux';
import type { ActionBase, ActionProto } from 'Types/common';
import type { Match } from 'Stores/ApplicationStore.flow';

import { NODE_ENV } from 'Actions/constants/application';

import dispatchAction from 'Core/dispatchAction';

const setNodeEnv: ActionProto<Match, null> = (): ActionBase<null> => (
    dispatch: Dispatch
) => {
    const nodeEnv = JSON.parse(unescape(process.env.OPTIONS));

    dispatchAction(dispatch, NODE_ENV, nodeEnv);

    return Promise.resolve(nodeEnv);
};

export default setNodeEnv;
