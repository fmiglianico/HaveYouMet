import { combineReducers } from 'redux';

import FacebookReducer from './FacebookReducer';
import RegisterReducer from './RegisterReducer';

const rootReducer = combineReducers(
	{
		facebook: FacebookReducer,
		login: RegisterReducer
	}
);

export default rootReducer;