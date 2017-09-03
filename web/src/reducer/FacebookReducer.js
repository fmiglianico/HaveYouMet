/*global FB*/

import store from '../stores/Store';
import * as Constants from '../constants/Constants';
import FacebookActionCreators from '../actions/FacebookActionCreators'
import deepFreeze from 'deepfreeze';

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
			new Promise(resolve => {
				window.FB.login(response => resolve(response), action.options);
			}).then(facebookAuthData => store.dispatch(FacebookActionCreators.facebookLoginSuccess(facebookAuthData)));
			return facebookState;
		case Constants.FACEBOOK_LOG_IN_SUCCESS:
			if (action.facebookAuthData.status === 'connected') {
				window.FB.api('/' + action.facebookAuthData.authResponse.userID +'/picture?type=small', (response) => store.dispatch(FacebookActionCreators.facebookPictureLoaded(response.data.url)));
				return Object.assign({}, facebookState, {
					facebookAuthData: action.facebookAuthData.authResponse
				});
			}
			return facebookState;
		default:
			return facebookState;
	}
};

function facebookCheckStatus(facebookState, action) {
	switch (action.type) {
		case Constants.FACEBOOK_CHECK_STATUS:
			new Promise(resolve => {
				window.FB.getLoginStatus(response => resolve(response));
			}).then(response => store.dispatch(FacebookActionCreators.facebookLoginSuccess(response)));
			return facebookState;
		default:
			return facebookState;
	}
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
	deepFreeze(facebookState);
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

		case Constants.FACEBOOK_GET_PICTURE_SUCCESS:
			return setFacebookPictureData(facebookState, action);

		case Constants.FACEBOOK_CHECK_STATUS:
			return facebookCheckStatus(facebookState, action);

		default:
			return facebookState;
	}
};

export default FacebookReducer;