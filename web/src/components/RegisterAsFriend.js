import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterAsFriend extends Component {

    render() {
        return (
			<div>
				<h2>Register as friend</h2>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		facebookAuth: state.facebook.facebookAuth,
		facebookPicture: state.facebook.facebookPicture,
		facebookProfile: state.facebook.facebookProfile
	};
};

export default connect(mapStateToProps)(RegisterAsFriend);
