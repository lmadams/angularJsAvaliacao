import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

const configureStore = () => {
  return createStore(
    rootReducer,
    compose(
      middleware,
      // Redux devTools
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
};

export default configureStore;
