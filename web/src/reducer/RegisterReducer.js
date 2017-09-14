import * as Constants from '../constants/Constants';

function register(registerState, action) {
	switch (action.type) {
		case Constants.REGISTER(Constants.PENDING):
			return {
				...registerState,
				profile: {
					saving: true
				}
			};
		case Constants.REGISTER(Constants.FULFILLED):
			return {
				...registerState,
				profile: {
					saving: false,
					saved: true,
					data: action.payload
				}
			};
		case Constants.REGISTER(Constants.REJECTED):
			return {
				...registerState,
				profile: {
					saving: false,
					saved: false,
					error: action.payload
				}
			};

		default:
			return registerState
	}
};

const initialRegisterState = {
	profile: {
		saving: false,
		saved: false,
		data: null,
		error: null
	}
};

const RegisterReducer = (registerState = initialRegisterState, action) => {
	return register(registerState, action);
};

export default RegisterReducer;