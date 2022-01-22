import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from '../reducers'

const development = process.env.NODE_ENV === 'development'
const composeEnhancers =
    (development && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    
export const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk))
)
