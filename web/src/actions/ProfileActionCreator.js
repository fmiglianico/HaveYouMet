import axios from 'axios';

import * as Constants from '../constants/Constants';

const ProfileActionCreators = {

	register: function (profile) {
		return {
			type: Constants.REGISTER(),
			payload: axios.post('http://localhost:3000/api/v0/profile', {profile})
		}
	},

	getProfile: function (facebookId) {
		return {
			type: Constants.GET_PROFILE(),
			payload: axios.get('http://localhost:3000/api/v0/profile/' + facebookId)
		}
	}
};


export default ProfileActionCreators;