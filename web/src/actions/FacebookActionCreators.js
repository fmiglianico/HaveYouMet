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
		return {
			type: Constants.FACEBOOK_LOG_IN,
			options
		}
	},

	facebookLoginSuccess: function (facebookAuthData) {
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
	}
};


export default FacebookActionCreators;