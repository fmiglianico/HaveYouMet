import { combineReducers } from 'redux';

import FacebookReducer from './FacebookReducer';
import RegisterReducer from './RegisterReducer';

const rootReducer = combineReducers(
	{
		facebook: FacebookReducer,
		register: RegisterReducer
	}
);

export default rootReducer;