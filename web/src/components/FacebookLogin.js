import React from 'react';
import FacebookActionCreators from '../actions/FacebookActionCreator';
import store from '../stores/Store';

class FacebookLogin extends React.Component {
    render() {
        return (
            <div className="fb-login-button btn btn-primary btn-xs btn-square" onClick={this.didClickFacebookLoginButton}>
				<i className="ion-social-facebook"></i>
            </div>
        );
    }

    didClickFacebookLoginButton() {
        store.dispatch(FacebookActionCreators.facebookLogin({scope: 'public_profile,email,user_likes,user_birthday,user_location'}));
    }
}

export default FacebookLogin;
