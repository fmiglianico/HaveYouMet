import { combineReducers } from 'redux';

import FacebookReducer from './FacebookReducer';
import ProfileReducer from './ProfileReducer';

const rootReducer = combineReducers(
	{
		facebook: FacebookReducer,
		profile: ProfileReducer
	}
);

export default rootReducer;