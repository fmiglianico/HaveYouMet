import React from 'react';
import FacebookActionCreators from '../actions/FacebookActionCreators';
import store from '../stores/Store';

class FacebookLogin extends React.Component {
    render() {
        return (
            <div className="fb-login-button btn btn-primary btn-xs btn-square"  onClick={this.didClickFacebookLoginButton}>
				<i className="ion-social-facebook"></i>
            </div>
        );
    }

    didClickFacebookLoginButton() {
        store.dispatch(FacebookActionCreators.facebookLogin());
    }
}

export default FacebookLogin;
