// @flow
import { combineReducers } from 'redux';

import ApplicationStore from './applicationStore';
import SetsStore from './setsStore';
import UserStore from './userStore';
import TrelloStore from './trelloStore';
import TrackingStore from './trackingStore';

const reducers = {
    ApplicationStore,
    TrackingStore,
    SetsStore,
    UserStore,
    TrelloStore,
};

export default combineReducers(reducers);
