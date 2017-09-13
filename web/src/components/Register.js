import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterActionCreator from '../actions/RegisterActionCreator';
import store from '../stores/Store';

class Register extends Component {
	constructor(props) {
		super(props);

		console.info('init');

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

	componentWillReceiveProps(nextProps) {
		if (!this.state.profile.firstName && nextProps.facebookProfile) {
			this.setState({
				profile: {
					name: nextProps.facebookProfile.first_name,
					gender: nextProps.facebookProfile.gender,
					interestedIn: nextProps.facebookProfile.gender === 'male' ? 'female' : 'male',
					birthday: nextProps.facebookProfile.birthday,
					location: nextProps.facebookProfile.location.name,
					facebookId: nextProps.facebookAuthData.userID
				}
			});
		}
	}

    render() {
        return (
            <section id="register" className="hero-fullscreen parallax" data-overlay-dark="7">
                <div className="background-image">
                    <img src="wunderkind/img/backgrounds/bg-1.jpg" alt="#" />
                </div>

                <div className="container">
                    <div className="row col-md-6 col-md-push-3 form">
                        <h1>Register</h1>

						<label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleFirstNameChange}
							   value={this.state.profile.name} />

						<label>Gender</label>
						<div>
							<label className="radio-inline">
								<input type="radio" name="gender" onChange={this.handleGenderChange}
									   defaultChecked={this.state.profile.gender !== 'female'} />
								Male
							</label>
							<label className="radio-inline">
								<input type="radio" name="gender" onChange={this.handleGenderChange}
									   defaultChecked={this.state.profile.gender === 'female'} />
								Female
							</label>
						</div>

						<label>Interested in</label>
						<div>
							<label className="radio-inline">
								<input type="radio" name="interestedIn" onChange={this.handleInterestedInChange}
									   defaultChecked={this.state.profile.interestedIn === 'male'} />
								Male
							</label>
							<label className="radio-inline">
								<input type="radio" name="interestedIn" onChange={this.handleInterestedInChange}
									   defaultChecked={this.state.profile.interestedIn !== 'male'} />
								Female
							</label>
						</div>

						<label htmlFor="birthday">Birthday</label>
						<input type="text" id="birthday" onChange={this.handleBirthdayChange}
							   value={this.state.profile.birthday}/>

						<label htmlFor="location">Location</label>
						<input type="text" id="location" onChange={this.handleLocationChange}
							   value={this.state.profile.location}/>

                        <button className="btn btn-primary btn-sm btn-square" onClick={this.didClickRegisterButton}>
							Register
						</button>

                    </div>
                </div>
            </section>
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
		facebookAuthData: state.facebook.facebookAuthData,
		facebookPictureData: state.facebook.facebookPictureData,
		facebookProfile: state.facebook.facebookProfile
	};
};

export default connect(mapStateToProps)(Register);
