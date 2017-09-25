import axios from 'axios';

import * as Constants from '../constants/Constants';

const ProfileActionCreators = {

	register: function (profile) {
		return {
			type: Constants.REGISTER(),
			payload: axios.post('/api/v0/profile', {profile})
		}
	},

	getProfile: function (id) {
		return {
			type: Constants.GET_MY_PROFILE(),
			payload: axios.get('/api/v0/profile', {
				params: {
					id
				}
			})
		}
	},

	getMyProfile: function (facebookId) {
		return {
			type: Constants.GET_MY_PROFILE(),
			payload: axios.get('/api/v0/profile', {
				params: {
					facebookId
				}
			})
		}
	},

	getAll: function (type, gender, ageMin, ageMax) {
		return {
			type: Constants.GET_ALL_PROFILE(),
			payload: axios.get('/api/v0/profiles', {
				params: {
					type,
					gender,
					ageMin,
					ageMax
				}
			})
		}
	},

	getSingle: function (singleId) {
		return {
			type: Constants.GET_SINGLE_PROFILE(),
			payload: axios.get('/api/v0/profile', {
				params: {
					singleId
				}
			}),
			meta: {
				fetchingId: singleId
			}
		}
	},

	getFriends: function (singleId) {
		return {
			type: Constants.GET_FRIENDS(),
			payload: axios.get('/api/v0/friends', {
				params: {
					singleId
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