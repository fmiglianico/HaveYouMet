function fetchingStates(actionType) {
	return (actionStatus) => {
		if (actionStatus) {
			return actionType + '_' + actionStatus;
		}
		return actionType;
	}
};

// Fetching statuses
export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';

// Action types
export const FACEBOOK_LOAD_SDK = fetchingStates('FACEBOOK_LOAD_SDK');
export const FACEBOOK_LOG_IN = fetchingStates('FACEBOOK_LOG_IN');
export const FACEBOOK_LOG_OUT = fetchingStates('FACEBOOK_LOG_OUT');
export const FACEBOOK_LOAD_PICTURE = fetchingStates('FACEBOOK_LOAD_PICTURE');
export const FACEBOOK_CHECK_STATUS = fetchingStates('FACEBOOK_CHECK_STATUS');
export const FACEBOOK_RETRIEVE_PERSONAL_INFO = fetchingStates('FACEBOOK_RETRIEVE_PERSONAL_INFO');

export const REGISTER = fetchingStates('REGISTER');
export const GET_PROFILE = fetchingStates('GET_PROFILE');
export const GET_ALL_PROFILE = fetchingStates('GET_ALL_PROFILE');


