// @flow
import type { Store } from 'redux';

import Context from 'Core/Context';
import ApplicationController from 'Core/ApplicationController';
import configureStore from 'Stores/configureStore';

const context = new Context();
const store: Store = configureStore({}, context);
// $FlowFixMe todo: flow не хочет понимать этот тип
const rootElement: Element = document.getElementById('root');

window.context = context;
context.setStore(store);

const app = new ApplicationController(context);

app.initialize();
app.render(rootElement);
