/*global FB*/

import * as Constants from '../constants/Constants';

const FacebookActionCreators = {

	loadSDK: function (appID, appVersion) {
		return {
			type: Constants.FACEBOOK_LOAD_SDK(),
			payload: new Promise(resolve => {
				window.fbAsyncInit = function () {
					FB.init({
						appId: appID,
						xfbml: true,
						cookie: true,
						version: appVersion
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
			})
		}
	},

	login: function (options) {
		return {
			type: Constants.FACEBOOK_LOG_IN(),
			payload: new Promise(resolve => {
				window.FB.login(response => resolve(response), options);
			})
		}
	},

	logout: function () {
		return {
			type: Constants.FACEBOOK_LOG_OUT(),
			payload: new Promise(resolve => {
				window.FB.logout(response => resolve(response));
			})
		}
	},

	checkStatus: function () {
		return {
			type: Constants.FACEBOOK_CHECK_STATUS(),
			payload: new Promise(resolve => {
				window.FB.getLoginStatus(response => resolve(response));
			})
		}
	},

	loadPicture: function(userId) {
		return {
			type: Constants.FACEBOOK_LOAD_PICTURE(),
			payload: new Promise(resolve => window.FB.api('/' + userId +'/picture?type=small',
				response => resolve(response)))
		}
	},

	retrievePersonalInfo : function() {
		return {
			type: Constants.FACEBOOK_RETRIEVE_PERSONAL_INFO(),
			payload: new Promise(resolve => {
				window.FB.api('/me?fields=first_name,last_name,gender,birthday,location',
					response => resolve(response));
			})
		}
	}
};


export default FacebookActionCreators;