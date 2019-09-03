// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import type Context from 'Core/Context';
import type { SetsStore } from 'Stores/SetsStore.flow';

import rootReducer from './index';

const composeEnhancers = composeWithDevTools({
    // Specify custom devTools options
    serialize: true,
});

export default function configureStore(
    initialState?: SetsStore | {} = {},
    context: Context
) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk.withExtraArgument(context)))
    );

    window.debugStore = store;

    return store;
}
