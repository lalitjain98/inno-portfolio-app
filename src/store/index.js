import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import portfolioData from './portfolioData';

const rootReducer = combineReducers({
    portfolioData,
});

const initialState = { }

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger)
    );
}

