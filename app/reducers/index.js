// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import bci from './bci';
import sound from './sound';

const rootReducer = combineReducers({
  bci,
  counter,
  router,
  sound
});

export default rootReducer;
