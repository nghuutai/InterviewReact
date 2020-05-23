import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as types from './common/action.type';

const initState = {
    notification: false
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case types.LOGIN:
            return {...state, notification: action.payload};
        case types.EXIT_NOTIFICATION:
            return {...state, notification: action.payload};
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;