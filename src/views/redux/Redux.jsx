import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';


const initialState = {
    value: 0
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'INCRESED' :
            return {...state, value: state.value+1};
        case 'DECRESED' :
            return {...state, value: state.value-1};
        default :
            return state;
    }
}

export const sagaMiddleware = createSagaMiddleware();

export const INCRESED = 'INCRESED';
export const DECRESED = 'DECRESED';

export const store = createStore(reducer, 
    compose(applyMiddleware(sagaMiddleware),composeWithDevTools()));




