import { combineReducers } from 'redux';

import FacebookReducer from './FacebookReducer';
import RegisterReducer from './RegisterReducer';

const rootReducer = combineReducers(
	{
		FacebookReducer,
		RegisterReducer
	}
);

export default rootReducer;