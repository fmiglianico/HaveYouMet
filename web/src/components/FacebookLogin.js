import React, { Component } from 'react';
import { connect } from 'react-redux'

import FacebookActionCreator from '../actions/FacebookActionCreator';
import store from '../stores/Store';

class FacebookLogin extends Component {
    render() {
        return (
            <div className="fb-login-button btn btn-primary btn-xs btn-square" onClick={this.didClickFacebookLoginButton}>
				<i className="ion-social-facebook"/>
            </div>
        );
    }

    didClickFacebookLoginButton() {
        store.dispatch(FacebookActionCreator.login({scope: 'public_profile,email,user_likes,user_birthday,user_location'}));
    }
}

const mapStateToProps = (state) => {
	return {
		facebookAuth: state.facebook.facebookAuth,
		profile: state.profile.profile
	};
};

export default connect(mapStateToProps)(FacebookLogin);
