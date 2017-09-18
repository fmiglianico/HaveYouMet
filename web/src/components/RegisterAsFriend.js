import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterActionCreator from '../actions/RegisterActionCreator';
import store from '../stores/Store';

class RegisterAsFriend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {
				name: '',
				gender: 'male',
				interestedIn: 'female',
				birthday: '',
				location: '',
				facebookId: ''
			}
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleInterestedInChange = this.handleInterestedInChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.didClickRegisterButton = this.didClickRegisterButton.bind(this);
	}

    render() {
        return (
			<div>
				<h2>Register as friend</h2>

				<button className="btn btn-primary btn-sm btn-round" onClick={this.props.register}>
					Register
				</button>
			</div>
        );
    }

	handleFirstNameChange(event) {
		this.setState({
			profile: {
				name: event.target.value
			}
		});
	}

	handleGenderChange(event) {
		this.setState({
			profile: {
				gender: event.target.value
			}
		});
	}

	handleInterestedInChange(event) {
		this.setState({
			profile: {
				interestedIn: event.target.value
			}
		});
	}

	handleLocationChange(event) {
		this.setState({
			profile: {
				location: event.target.value
			}
		});
	}

	handleBirthdayChange(event) {
		this.setState({
			profile: {
				birthday: event.target.value
			}
		});
	}

	didClickRegisterButton() {
        store.dispatch(RegisterActionCreator.register(this.state.profile));
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
