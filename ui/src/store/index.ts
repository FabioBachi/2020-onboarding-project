import { combineReducers, createStore } from 'redux';

import movies from './ducks/movies';

export default createStore(combineReducers({ movies }));
