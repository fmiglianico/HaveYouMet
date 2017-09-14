import axios from 'axios';

import * as Constants from '../constants/Constants';

const RegisterActionCreators = {

	register: function (profile) {
		return {
			type: Constants.REGISTER(),
			payload: axios.post('http://localhost:3000/api/v0/profile', {profile: profile})
		}
	},
};


export default RegisterActionCreators;