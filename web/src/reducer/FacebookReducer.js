/*global FB*/

import * as Constants from '../constants/Constants';

function loadSDK(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOAD_SDK(Constants.PENDING):
			return {
				...facebookState,
				facebookSDK: {
					fetching: true
				}
			};
		case Constants.FACEBOOK_LOAD_SDK(Constants.FULFILLED):
			return {
				...facebookState,
				facebookSDK: {
					fetching: false,
					fetched: true
				}
			};
		case Constants.FACEBOOK_LOAD_SDK(Constants.REJECTED):
			return {
				...facebookState,
				facebookSDK: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};

		default:
			return facebookState
	}
}

function login(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOG_IN(Constants.PENDING):
			return {
				...facebookState,
				facebookAuth: {
					fetching: true
				}
			};
		case Constants.FACEBOOK_LOG_IN(Constants.FULFILLED):
			if (action.payload.status && action.payload.status === 'connected') {
				return {
					...facebookState,
					facebookAuth: {
						fetching: false,
						fetched: true,
						data: action.payload.authResponse
					}
				};
			}
			return facebookState;
		case Constants.FACEBOOK_LOG_IN(Constants.REJECTED):
			return {
				...facebookState,
				facebookAuth: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};
		default:
			return facebookState;
	}
}

function logout(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOG_OUT(Constants.PENDING):
			return facebookState;
		case Constants.FACEBOOK_LOG_OUT(Constants.FULFILLED):
			return {
				...facebookState,
				facebookAuth: {
					fetched: false,
					fetching: false,
					error: null,
					data: null
				},
				facebookPicture: {
					fetched: false,
					fetching: false,
					error: null,
					data: null
				}
			};
		default:
			return facebookState;
	}
}

function checkStatus(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_CHECK_STATUS(Constants.PENDING):
			return {
				...facebookState,
				facebookCheckStatus: {
					fetching: true
				}
			};
		case Constants.FACEBOOK_CHECK_STATUS(Constants.FULFILLED):
			if (action.payload.status === 'connected') {
				return {
					...facebookState,
					facebookCheckStatus: {
						fetching: false,
						fetched: true,
					},
					facebookAuth: {
						fetching: false,
						fetched: true,
						data: action.payload.authResponse
					}
				};
			}
			return facebookState;
		case Constants.FACEBOOK_CHECK_STATUS(Constants.REJECTED):
			return {
				...facebookState,
				facebookCheckStatus: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};
		default:
			return facebookState;
	}
}

function loadPicture(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOAD_PICTURE(Constants.PENDING):
			return {
				...facebookState,
				facebookPicture: {
					fetching: true
				}
			};
		case Constants.FACEBOOK_LOAD_PICTURE(Constants.FULFILLED):
			return {
				...facebookState,
				facebookPicture: {
					fetching: false,
					fetched: true,
					data: action.payload.data
				}
			};
		case Constants.FACEBOOK_LOAD_PICTURE(Constants.REJECTED):
			return {
				...facebookState,
				facebookPicture: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};
		default:
			return facebookState;
	}
}



function retrievePersonalInfo(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.PENDING):
			return {
				...facebookState,
				facebookProfile: {
					fetching: true
				}
			};
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.FULFILLED):
			return {
				...facebookState,
				facebookProfile: {
					fetching: false,
					fetched: true,
					data: action.payload
				}
			};
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.REJECTED):
			return {
				...facebookState,
				facebookProfile: {
					fetching: false,
					fetched: false,
					error: action.payload
				}
			};
		default:
			return facebookState;
	}
};

const initialFacebookState = {
	facebookSDK: {
		fetched: false,
		fetching: false,
		error: null
	},
	facebookAuth: {
		fetched: false,
		fetching: false,
		error: null,
		data: null
	},
	facebookPicture: {
		fetched: false,
		fetching: false,
		error: null,
		data: null
	},
	facebookProfile: {
		fetched: false,
		fetching: false,
		error: null,
		data: null
	},
	facebookCheckStatus: {
		fetched: false,
		fetching: false,
		error: null
	}
};

const FacebookReducer = (facebookState = initialFacebookState, action) => {

	switch (action.type) {
		case Constants.FACEBOOK_LOAD_SDK(Constants.PENDING):
		case Constants.FACEBOOK_LOAD_SDK(Constants.FULFILLED):
		case Constants.FACEBOOK_LOAD_SDK(Constants.REJECTED):
			return loadSDK(facebookState, action);

		case Constants.FACEBOOK_LOG_IN(Constants.PENDING):
		case Constants.FACEBOOK_LOG_IN(Constants.FULFILLED):
		case Constants.FACEBOOK_LOG_IN(Constants.REJECTED):
			return login(facebookState, action);

		case Constants.FACEBOOK_LOG_OUT(Constants.PENDING):
		case Constants.FACEBOOK_LOG_OUT(Constants.FULFILLED):
		case Constants.FACEBOOK_LOG_OUT(Constants.REJECTED):
			return logout(facebookState, action);

		case Constants.FACEBOOK_LOAD_PICTURE(Constants.PENDING):
		case Constants.FACEBOOK_LOAD_PICTURE(Constants.FULFILLED):
		case Constants.FACEBOOK_LOAD_PICTURE(Constants.REJECTED):
			return loadPicture(facebookState, action);

		case Constants.FACEBOOK_CHECK_STATUS(Constants.PENDING):
		case Constants.FACEBOOK_CHECK_STATUS(Constants.FULFILLED):
		case Constants.FACEBOOK_CHECK_STATUS(Constants.REJECTED):
			return checkStatus(facebookState, action);

		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.PENDING):
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.FULFILLED):
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(Constants.REJECTED):
			return retrievePersonalInfo(facebookState, action);

		default:
			return facebookState;
	}
};

export default FacebookReducer;

// window.FB.api('/me/likes', {'limit': '2000'}, response => {console.info('response', response); a = response;})