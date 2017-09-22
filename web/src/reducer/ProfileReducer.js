import * as Constants from '../constants/Constants';

function register(profileState, action) {
	switch (action.type) {
		case Constants.REGISTER(Constants.PENDING):
			return {
				...profileState,
				register: {
					saving: true
				}
			};
		case Constants.REGISTER(Constants.FULFILLED):
			return {
				...profileState,
				register: {
					saving: false,
					saved: true,
					data: action.payload
				}
			};
		case Constants.REGISTER(Constants.REJECTED):
			return {
				...profileState,
				register: {
					saving: false,
					saved: false,
					error: action.payload
				}
			};

		default:
			return profileState
	}
}

function getProfile(profileState, action) {
	switch (action.type) {
		case Constants.GET_MY_PROFILE(Constants.PENDING):
			return {
				...profileState,
				profile: {
					fetching: true
				}
			};
		case Constants.GET_MY_PROFILE(Constants.FULFILLED):
			return {
				...profileState,
				profile: {
					fetching: false,
					fetched: true,
					data: action.payload.data
				}
			};
		case Constants.GET_MY_PROFILE(Constants.REJECTED):
			return {
				...profileState,
				profile: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};

		default:
			return profileState
	}
}

function getSingle(profileState, action) {
	switch (action.type) {
		case Constants.GET_SINGLE_PROFILE(Constants.PENDING):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					single: {
						fetching: true
					}
				}
			};
		case Constants.GET_SINGLE_PROFILE(Constants.FULFILLED):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					single: {
						fetching: false,
						fetched: true,
						data: action.payload.data
					}
				}
			};
		case Constants.GET_SINGLE_PROFILE(Constants.REJECTED):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					single: {
						fetching: false,
						fetched: true,
						error: action.payload
					}
				}
			};

		default:
			return profileState
	}
}


function getFriends(profileState, action) {
	switch (action.type) {
		case Constants.GET_FRIENDS(Constants.PENDING):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					friends: {
						fetching: true
					}
				}
			};
		case Constants.GET_FRIENDS(Constants.FULFILLED):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					friends: {
						fetching: false,
						fetched: true,
						data: action.payload.data
					}
				}
			};
		case Constants.GET_FRIENDS(Constants.REJECTED):
			return {
				...profileState,
				currentProfile: {
					...profileState.currentProfile,
					friends: {
						fetching: false,
						fetched: true,
						data: action.payload.data
					}
				}
			};

		default:
			return profileState
	}
}

function getAllProfile(profileState, action) {
	switch (action.type) {
		case Constants.GET_ALL_PROFILE(Constants.PENDING):
			return {
				...profileState,
				profiles: {
					fetching: true
				}
			};
		case Constants.GET_ALL_PROFILE(Constants.FULFILLED):
			return {
				...profileState,
				profiles: {
					fetching: false,
					fetched: true,
					data: action.payload.data
				}
			};
		case Constants.GET_ALL_PROFILE(Constants.REJECTED):
			return {
				...profileState,
				profiles: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};

		default:
			return profileState
	}
}

function logout(profileState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOG_OUT(Constants.FULFILLED):
			return {
				...profileState,
				profile: {
					fetching: false,
					fetched: false,
					data: null,
					error: null
				}
			};

		default:
			return profileState
	}
}

const initialProfileState = {
	register: {
		saving: false,
		saved: false,
		data: null,
		error: null
	},
	profile: {
		fetching: false,
		fetched: false,
		data: null,
		error: null
	},
	profiles: {
		fetching: false,
		fetched: false,
		data: null,
		error: null
	},
	currentProfile: {
		single: {
			fetching: false,
			fetched: false,
			data: null,
			error: null
		},
		friends: {
			fetching: false,
			fetched: false,
			data: null,
			error: null
		}
	}
};

const ProfileReducer = (profileState = initialProfileState, action) => {

	switch (action.type) {
		case Constants.REGISTER(Constants.PENDING):
		case Constants.REGISTER(Constants.FULFILLED):
		case Constants.REGISTER(Constants.REJECTED):
			return register(profileState, action);

		case Constants.GET_MY_PROFILE(Constants.PENDING):
		case Constants.GET_MY_PROFILE(Constants.FULFILLED):
		case Constants.GET_MY_PROFILE(Constants.REJECTED):
			return getProfile(profileState, action);

		case Constants.GET_ALL_PROFILE(Constants.PENDING):
		case Constants.GET_ALL_PROFILE(Constants.FULFILLED):
		case Constants.GET_ALL_PROFILE(Constants.REJECTED):
			return getAllProfile(profileState, action);

		case Constants.GET_SINGLE_PROFILE(Constants.PENDING):
		case Constants.GET_SINGLE_PROFILE(Constants.FULFILLED):
		case Constants.GET_SINGLE_PROFILE(Constants.REJECTED):
			return getSingle(profileState, action);

		case Constants.GET_FRIENDS(Constants.PENDING):
		case Constants.GET_FRIENDS(Constants.FULFILLED):
		case Constants.GET_FRIENDS(Constants.REJECTED):
			return getFriends(profileState, action);

		case Constants.FACEBOOK_LOG_OUT(Constants.FULFILLED):
			return logout(profileState, action);

		default:
			return profileState;
	}
};

export default ProfileReducer;