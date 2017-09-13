/*global FB*/

import store from '../stores/Store';
import * as Constants from '../constants/Constants';
import FacebookActionCreator from '../actions/FacebookActionCreator'

function loadFacebookSDK(facebookState, action) {

	new Promise(resolve => {
		window.fbAsyncInit = function () {
			FB.init({
				appId: action.appID,
				xfbml: true,
				cookie: true,
				version: action.appVersion
			});
			FB.AppEvents.logPageView();
			resolve();
		};
		(function (d, s, id) {
			const fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			const js = d.createElement(s);
			js.id = id;
			js.src = '//connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}).then(() => {
		store.dispatch(FacebookActionCreator.facebookSDKLoaded());
		store.dispatch(FacebookActionCreator.facebookCheckStatus());
	});
	return facebookState;
};

function facebookSDKLoaded(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOAD_SDK_SUCCESS:
			return Object.assign({}, facebookState, {
				facebookSDK: {
					loaded: true
				}
			});
		case Constants.FACEBOOK_LOAD_SDK_FAILURE:
			return Object.assign({}, facebookState, {
				facebookSDK: {
					loaded: false,
					error: action.error
				}
			});

		default:
			return facebookState
	}
};

function facebookLogin(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOG_IN:
			new Promise(resolve => {
				window.FB.login(response => resolve(response), action.options);
			}).then(facebookAuthData => {
				store.dispatch(FacebookActionCreator.facebookLoginSuccess(facebookAuthData));
				store.dispatch(FacebookActionCreator.facebookRetrievePersonalInfo());
			});
			return facebookState;
		case Constants.FACEBOOK_LOG_IN_SUCCESS:
			if (action.facebookAuthData.status === 'connected') {
				window.FB.api('/' + action.facebookAuthData.authResponse.userID +'/picture?type=small',
					(response) => store.dispatch(FacebookActionCreator.facebookPictureLoaded(response.data.url)));
				return Object.assign({}, facebookState, {
					facebookAuthData: action.facebookAuthData.authResponse
				});
			}
			return facebookState;
		default:
			return facebookState;
	}
};

function facebookLogout(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_LOG_OUT:
			new Promise(resolve => {
				window.FB.logout(response => resolve(response), action.options);
			}).then((response) => {store.dispatch(FacebookActionCreator.facebookLogoutSuccess()); console.info('logout response', response);});
			return facebookState;
		case Constants.FACEBOOK_LOG_OUT_SUCCESS:
			return new Object.assign({}, facebookState, {
				facebookAuthData: null,
				facebookPictureData: null
			});
		default:
			return facebookState;
	}
};

function facebookCheckStatus(facebookState, action) {
	new Promise(resolve => {
		window.FB.getLoginStatus(response => resolve(response));
	}).then(response => {
		if (response.status === 'connected') {
			store.dispatch(FacebookActionCreator.facebookLoginSuccess(response));
			store.dispatch(FacebookActionCreator.facebookRetrievePersonalInfo());
		}
	});
	return facebookState;
};

function setFacebookPictureData(facebookState, action) {
	return Object.assign({}, facebookState, {
		facebookPictureData: action.pictureURL
	});
};



function facebookRetrievePersonalInfo(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO:
			new Promise(resolve => {
				window.FB.api('/me?fields=first_name,last_name,gender,birthday,location',
					response => resolve(response));
			}).then(facebookProfile => store.dispatch(FacebookActionCreator.facebookRetrievePersonalInfoSuccess(facebookProfile)));
			return facebookState;
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO_SUCCESS:
			console.info('facebookProfile', action.facebookProfile);
			return Object.assign({}, facebookState, {
				facebookProfile: action.facebookProfile
			});
		default:
			return facebookState;
	}
};

const initialFacebookState = {
	facebookSDK: {
		loaded: false,
		error: null
	},
	facebookAuthData: null,
	facebookPictureData: null,
	facebookProfile: null
};

const FacebookReducer = (facebookState = initialFacebookState, action) => {

	switch (action.type) {
		case Constants.FACEBOOK_LOAD_SDK:
			return loadFacebookSDK(facebookState, action);

		case Constants.FACEBOOK_LOAD_SDK_SUCCESS:
		case Constants.FACEBOOK_LOAD_SDK_FAILURE:
			return facebookSDKLoaded(facebookState, action);

		case Constants.FACEBOOK_LOG_IN:
		case Constants.FACEBOOK_LOG_IN_SUCCESS:
		case Constants.FACEBOOK_LOG_IN_FAILURE:
			return facebookLogin(facebookState, action);

		case Constants.FACEBOOK_LOG_OUT:
		case Constants.FACEBOOK_LOG_OUT_SUCCESS:
		case Constants.FACEBOOK_LOG_OUT_FAILURE:
			return facebookLogout(facebookState, action);

		case Constants.FACEBOOK_GET_PICTURE_SUCCESS:
			return setFacebookPictureData(facebookState, action);

		case Constants.FACEBOOK_CHECK_STATUS:
			return facebookCheckStatus(facebookState, action);

		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO:
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO_SUCCESS:
		case Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO_FAILURE:
			return facebookRetrievePersonalInfo(facebookState, action);

		default:
			return facebookState;
	}
};

export default FacebookReducer;

// window.FB.api('/me/likes', {'limit': '2000'}, response => {console.info('response', response); a = response;})