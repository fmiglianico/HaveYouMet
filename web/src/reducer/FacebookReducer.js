/*global FB*/

import store from '../stores/Store';
import * as Constants from '../constants/Constants';
import FacebookActionCreators from '../actions/FacebookActionCreators'

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
		store.dispatch(FacebookActionCreators.facebookSDKLoaded());
		store.dispatch(FacebookActionCreators.facebookCheckStatus());
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
			console.info('Log in start');
			new Promise(resolve => {
				window.FB.login(response => resolve(response), action.options);
			}).then(facebookAuthData => store.dispatch(FacebookActionCreators.facebookLoginSuccess(facebookAuthData)));
			return facebookState;
		case Constants.FACEBOOK_LOG_IN_SUCCESS:
			console.info('Log in success start');
			if (action.facebookAuthData.status === 'connected') {
				window.FB.api('/' + action.facebookAuthData.authResponse.userID +'/picture?type=small',
					(response) => store.dispatch(FacebookActionCreators.facebookPictureLoaded(response.data.url)));
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
			}).then((response) => {store.dispatch(FacebookActionCreators.facebookLogoutSuccess()); console.info('logout response', response);});
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
			store.dispatch(FacebookActionCreators.facebookLoginSuccess(response));
		}
	});
	return facebookState;
};

function setFacebookPictureData(facebookState, action) {
	return Object.assign({}, facebookState, {
		facebookPictureData: action.pictureURL
	});
};

const initialFacebookState = {
	facebookSDK: {
		loaded: false,
		error: null
	},
	facebookAuthData: null,
	facebookPictureData: null
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

		default:
			return facebookState;
	}
};

export default FacebookReducer;


// window.FB.api('/me?fields=first_name,last_name,age_range,gender,birthday,location', response => {console.info('response', response); a = response;})
// window.FB.api('/me/likes', {'limit': '2000'}, response => {console.info('response', response); a = response;})