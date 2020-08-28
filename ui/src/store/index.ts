import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import media from './ducks/media';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default createStore(
  combineReducers({ media }),
  applyMiddleware(...middlewares)
);
