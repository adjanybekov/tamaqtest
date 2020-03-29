import {createStore, applyMiddleware} from 'redux'
import allReducers from './root.reducer';
import logger from 'redux-logger';

const middleware = [logger];

export const store = createStore(allReducers,applyMiddleware(...middleware));