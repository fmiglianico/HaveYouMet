import React from 'react';

import store from '../stores/Store';
import FacebookActionCreators from '../actions/FacebookActionCreator';

class FacebookLogout extends React.Component {
    render() {
        return (
            <a href="#" onClick={this.didClickFacebookLogoutButton}>Log Out</a>
        );
    }

    didClickFacebookLogoutButton() {
		store.dispatch(FacebookActionCreators.facebookLogout());
    }
}

export default FacebookLogout;
