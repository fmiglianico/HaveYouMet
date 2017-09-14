import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import rootReducer from '../reducer/RootReducer';

const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(rootReducer, middleware);