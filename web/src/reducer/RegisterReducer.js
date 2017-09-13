import 'whatwg-fetch';

import store from '../stores/Store';
import * as Constants from '../constants/Constants';
import RegisterActionCreator from '../actions/RegisterActionCreator'

function register(loginState, action) {
	console.info('action.profile', action.profile);
	switch (action.type) {
		case Constants.REGISTER:
			window.fetch('http://localhost:3000/api/v0/profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors',
				body: JSON.stringify({profile: action.profile})
			}).then(response => {
				console.info('fetch response', response);
				store.dispatch(RegisterActionCreator.registerSuccess('Registration OK'));
			});
			return loginState;
		case Constants.REGISTER_SUCCESS:
			console.info('Register success');
			return loginState;
		default:
			return loginState;
	}
};

const initialRegisterState = {
	profile: null
};

const RegisterReducer = (registerState = initialRegisterState, action) => {
		return register(registerState, action);
};

export default RegisterReducer;