import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension's option like name, actionBlacklist, actionsCreators, serialize....
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);
export default store;
