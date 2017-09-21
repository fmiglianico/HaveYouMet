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

	getAll: function (type, gender, ageMin, ageMax) {
		return {
			type: Constants.GET_ALL_PROFILE(),
			payload: axios.get('/api/v0/profile', {
				params: {
					type,
					gender,
					ageMin,
					ageMax
				}
			})
		}
	},

	linkFriend: function (singleId, friendId) {
		return {
			type: Constants.LINK_FRIEND(),
			payload: axios.post('/api/v0/ishelpedby', {
				singleId,
				friendId
			})
		}
	}
};


export default ProfileActionCreators;