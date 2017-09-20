import * as Constants from '../constants/Constants';

function register(registerState, action) {
	switch (action.type) {
		case Constants.REGISTER(Constants.PENDING):
			return {
				...registerState,
				register: {
					saving: true
				}
			};
		case Constants.REGISTER(Constants.FULFILLED):
			return {
				...registerState,
				register: {
					saving: false,
					saved: true,
					data: action.payload
				}
			};
		case Constants.REGISTER(Constants.REJECTED):
			return {
				...registerState,
				register: {
					saving: false,
					saved: false,
					error: action.payload
				}
			};

		default:
			return registerState
	}
};

function getProfile(profileState, action) {
	switch (action.type) {
		case Constants.GET_PROFILE(Constants.PENDING):
			return {
				...profileState,
				profile: {
					fetching: true
				}
			};
		case Constants.GET_PROFILE(Constants.FULFILLED):
			return {
				...profileState,
				profile: {
					fetching: false,
					fetched: true,
					data: action.payload
				}
			};
		case Constants.GET_PROFILE(Constants.REJECTED):
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
};

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
};

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
	}
};

const ProfileReducer = (profileState = initialProfileState, action) => {

	switch (action.type) {
		case Constants.REGISTER(Constants.PENDING):
		case Constants.REGISTER(Constants.FULFILLED):
		case Constants.REGISTER(Constants.REJECTED):
			return register(profileState, action);

		case Constants.GET_PROFILE(Constants.PENDING):
		case Constants.GET_PROFILE(Constants.FULFILLED):
		case Constants.GET_PROFILE(Constants.REJECTED):
			return getProfile(profileState, action);

		case Constants.GET_ALL_PROFILE(Constants.PENDING):
		case Constants.GET_ALL_PROFILE(Constants.FULFILLED):
		case Constants.GET_ALL_PROFILE(Constants.REJECTED):
			return getAllProfile(profileState, action);

		default:
			return profileState;
	}
};

export default ProfileReducer;