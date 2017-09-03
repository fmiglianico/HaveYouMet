/*global FB*/

import Constants from '../constants/Constants'

const APP_ID = '1110690499060538';

const FacebookActionCreators = {

	loadFbSdk: function (appId, version) {
		return new Promise(resolve => {
			window.fbAsyncInit = function () {
				FB.init({
					appId: APP_ID,
					xfbml: true,
					cookie: true,
					version: 'v2.5'
				});
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
		});
	},

	getLoginStatus: function () {
		return new Promise(resolve => {
			window.FB.getLoginStatus(responseStatus => {
				resolve(responseStatus);
			});
		});
	},

	fbLogin: function (options) {
		return new Promise(resolve => {
			window.FB.login(response => resolve(response), options);
		});
	},

	fbLogout: function () {
		return new Promise(resolve => {
			window.FB.logout(response => resolve(response));
		});
	},

	loadFBPicture: function(userId, pictureSize) {
		return new Promise(resolve => {
			window.FB.api('/' + userId +'/picture?type=' + pictureSize, (response) => resolve(response));
		});
	}
};


export default FacebookActionCreators;