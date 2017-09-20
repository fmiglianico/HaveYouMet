import React, { Component } from 'react';

import store from '../stores/Store';
import FacebookActionCreators from '../actions/FacebookActionCreator';

class FacebookLogout extends Component {
    render() {
        return (
            <a href="#" onClick={this.didClickFacebookLogoutButton}>Log Out</a>
        );
    }

    didClickFacebookLogoutButton() {
		store.dispatch(FacebookActionCreators.logout());
    }
}

export default FacebookLogout;
