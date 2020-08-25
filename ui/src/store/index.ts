import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import movies from './ducks/movies';

export default createStore(
  combineReducers({ movies }),
  applyMiddleware(logger)
);
