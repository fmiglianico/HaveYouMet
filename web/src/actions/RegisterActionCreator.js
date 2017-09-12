import * as Constants from '../constants/Constants';

const RegisterActionCreators = {

	register: function (profile) {
		return {
			type: Constants.REGISTER,
			profile
		}
	},

	registerSuccess: function (registerResponse) {
		return {
			type: Constants.REGISTER_SUCCESS,
			registerResponse
		}
	},

	registerFailure: function (registerResponse) {
		return {
			type: Constants.REGISTER_FAILURE,
			registerResponse
		}
	}
};


export default RegisterActionCreators;