import axios from 'axios';

import * as Constants from '../constants/Constants';

const ProfileActionCreators = {

	register: function (profile) {
		return {
			type: Constants.REGISTER(),
			payload: axios.post('/api/v0/profile', {profile})
		}
	},

	getProfile: function (facebookId) {
		return {
			type: Constants.GET_PROFILE(),
			payload: axios.get('/api/v0/profile/' + facebookId)
		}
	},

	getAll: function (gender, ageMin, ageMax) {
		return {
			type: Constants.GET_ALL_PROFILE(),
			payload: axios.get('/api/v0/profile', {
				params: {
					gender,
					ageMin,
					ageMax
				}
			})
		}
	}
};


export default ProfileActionCreators;