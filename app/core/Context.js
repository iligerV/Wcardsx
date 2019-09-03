// @flow
import type { Store } from 'redux';
import type { ContextRouter } from 'react-router-dom';

import type { ActionProto } from 'Types/common';
import type { Match } from 'Stores/ApplicationStore.flow';

class Context
{
    store: Store;
    history: ContextRouter.history;
    match: Match;

    setStore(inStore: Store)
    {
        this.store = inStore;
    }

    setHistory(history: ContextRouter.history)
    {
        this.history = history;
    }

    // eslint-disable-next-line flowtype/no-weak-types
    // executeAction(action: Function, payload: mixed): Promise<any>
    executeAction<T, R>(action: ActionProto<T, R>, payload: T): Promise<R>
    {
        const { dispatch, getState } = this.store;

        return Promise.resolve(action(payload)(dispatch, getState, this));
    }
}

export default Context;
