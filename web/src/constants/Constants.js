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
export let FACEBOOK_LOAD_SDK = fetchingStates('FACEBOOK_LOAD_SDK');
export let FACEBOOK_LOG_IN = fetchingStates('FACEBOOK_LOG_IN');
export let FACEBOOK_LOG_OUT = fetchingStates('FACEBOOK_LOG_OUT');
export let FACEBOOK_LOAD_PICTURE = fetchingStates('FACEBOOK_LOAD_PICTURE');
export let FACEBOOK_CHECK_STATUS = fetchingStates('FACEBOOK_CHECK_STATUS');
export let FACEBOOK_RETRIEVE_PERSONAL_INFO = fetchingStates('FACEBOOK_RETRIEVE_PERSONAL_INFO');

export const REGISTER = fetchingStates('REGISTER');
export const GET_PROFILE = fetchingStates('GET_PROFILE');


