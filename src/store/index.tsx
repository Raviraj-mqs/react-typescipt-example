import { createStore, compose, applyMiddleware } from "redux"
import rootReducer from "./rootReducer"
import thunk from "redux-thunk"


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    {},
    // composeEnhancers()
    composeEnhancers(applyMiddleware(...middleware))
)

export default store
