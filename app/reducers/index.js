// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import bci from './bci';

const rootReducer = combineReducers({
    bci,
    counter,
    router,
});

export default rootReducer;