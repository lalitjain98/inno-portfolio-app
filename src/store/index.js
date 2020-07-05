import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import portfolioData from './portfolioData';
import feedbacks from './feedbacks';

const rootReducer = combineReducers({
    portfolioData,
    feedbacks,
});

const initialState = { }

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger)
    );
}

