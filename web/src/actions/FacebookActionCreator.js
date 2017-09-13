import * as Constants from '../constants/Constants';

const FacebookActionCreators = {

	loadFacebookSDK: function (appID, appVersion) {
		return {
			type: Constants.FACEBOOK_LOAD_SDK,
			appID,
			appVersion
		}
	},

	facebookSDKLoaded: function () {
		return {
			type: Constants.FACEBOOK_LOAD_SDK_SUCCESS
		}
	},

	facebookSDKLoadingError: function () {
		return {
			type: Constants.FACEBOOK_LOAD_SDK_FAILURE,
			error: 'Error occurred while loading SDK'
		}
	},

	facebookLogin: function (options) {
		console.info('start facebook login', options)
		return {
			type: Constants.FACEBOOK_LOG_IN,
			options
		}
	},

	facebookLoginSuccess: function (facebookAuthData) {
		console.info('Logged in', facebookAuthData);
		return {
			type: Constants.FACEBOOK_LOG_IN_SUCCESS,
			facebookAuthData
		}
	},

	facebookLoginError: function (error) {
		return {
			type: Constants.FACEBOOK_LOG_IN_FAILURE,
			error
		}
	},

	facebookLogout: function () {
		return {
			type: Constants.FACEBOOK_LOG_OUT
		}
	},

	facebookLogoutSuccess: function () {
		return {
			type: Constants.FACEBOOK_LOG_OUT_SUCCESS
		}
	},

	facebookCheckStatus: function () {
		return {
			type: Constants.FACEBOOK_CHECK_STATUS
		}
	},

	facebookPictureLoaded: function(pictureURL) {
		return {
			type: Constants.FACEBOOK_GET_PICTURE_SUCCESS,
			pictureURL
		}
	},

	facebookRetrievePersonalInfo : function() {
		return {
			type: Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO
		}
	},

	facebookRetrievePersonalInfoSuccess : function(facebookProfile) {
		return {
			type: Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO_SUCCESS,
			facebookProfile
		}
	},

	facebookRetrievePersonalInfoFailure : function(error) {
		return {
			type: Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO_FAILURE,
			error
		}
	}
};


export default FacebookActionCreators;