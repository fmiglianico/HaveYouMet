import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import RegisterActionCreator from '../actions/ProfileActionCreator';
import FacebookActionCreator from '../actions/FacebookActionCreator';
import store from '../stores/Store';
import RegisterAsFriend from './RegisterAsFriend'
import RegisterAsSingle from './RegisterAsSingle'

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			gender: 'male',
			interestedIn: 'female',
			ageMin: 18,
			ageMax: 18,
			type: '',
			birthday: '',
			location: '',
			facebookId: ''
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.didClickRegisterButton = this.didClickRegisterButton.bind(this);
		this.didClickSingleButton = this.didClickSingleButton.bind(this);
		this.didClickFriendButton = this.didClickFriendButton.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleInterestedInChange = this.handleInterestedInChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleAgeMinChange = this.handleAgeMinChange.bind(this);
		this.handleAgeMaxChange = this.handleAgeMaxChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.name && nextProps.facebookAuth.fetched
			&& !nextProps.facebookProfile.fetching && !nextProps.facebookProfile.fetched) {
			store.dispatch(FacebookActionCreator.retrievePersonalInfo());
		} else if (!this.state.name && nextProps.facebookProfile.fetched) {
			this.setState({
				name: nextProps.facebookProfile.data.first_name,
				gender: nextProps.facebookProfile.data.gender,
				interestedIn: nextProps.facebookProfile.data.gender === 'male' ? 'female' : 'male',
				birthday: this.getFormattedFacebookBirthday(nextProps.facebookProfile.data.birthday),
				location: nextProps.facebookProfile.data.location.name,
				facebookId: nextProps.facebookAuth.data.userID
			});
		}
	}

	getFormattedFacebookBirthday(facebookBirthday) {
		if (facebookBirthday.length === 4) {
			return facebookBirthday + '0101';
		} else if (facebookBirthday.length === 5) {
			return '1990-' + facebookBirthday.split('/').join('-');
		}

		const facebookBirthdayArray = facebookBirthday.split('/');
		return facebookBirthdayArray[2] + '-'
			+ facebookBirthdayArray[0] + '-'
			+ facebookBirthdayArray[1];
	}

	render() {

		if (this.props.register.saved) {
			return (
				<section id="registration-done" className="first-section col-md-12 text-center">
					<h1>Thank you for registering !</h1>
					<p>
						Continue to <Link to="/">Home</Link>
					</p>
				</section>
			)
		}

		const registerButtonClass = this.state.type ? '' : 'hidden';

		return (
			<section id="register" className="first-section">

				<div className="container">
					<div className="row col-md-6 col-md-push-3 form">
						<h1>Register</h1>

						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" onChange={this.handleFirstNameChange}
							   value={this.state.name}/>

						<div className="buttons-tabs-centered">

							<ul id="buttonTabs" className="nav-tabs nav-tabs-center register-choice-button">
								<li className={this.state.type === 'single' ? 'active' : ''}>
									<a href="#" onClick={this.didClickSingleButton}>I'm single</a>
								</li>
								<li className={this.state.type === 'friend' ? 'active' : ''}>
									<a href="#" onClick={this.didClickFriendButton}>I'm helping a friend</a>
								</li>
							</ul>

							{ this.state.type === 'single' ?
								<RegisterAsSingle
									register={this.didClickRegisterButton}
									handleGenderChange={this.handleGenderChange} gender={this.state.gender}
									handleInterestedInChange={this.handleInterestedInChange} interestedIn={this.state.interestedIn}
									handleLocationChange={this.handleLocationChange} location={this.state.location}
									handleBirthdayChange={this.handleBirthdayChange} birthday={this.state.birthday}
									handleAgeMinChange={this.handleAgeMinChange} ageMin={this.state.ageMin}
									handleAgeMaxChange={this.handleAgeMaxChange} ageMax={this.state.ageMax}
									/> : null }
							{ this.state.type === 'friend' ? <RegisterAsFriend register={this.didClickRegisterButton}/> : null }

							<button className={'btn btn-primary btn-sm btn-round ' + registerButtonClass} onClick={this.didClickRegisterButton}>
							Register
							</button>

						</div>
					</div>
				</div>
			</section>
		)
	}

	handleFirstNameChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	handleTypeChange(event) {
		this.setState({
			type: event.target.value
		})
	}

	didClickSingleButton() {
		this.setState({
			type: 'single'
		})
	}

	didClickFriendButton() {
		this.setState({
			type: 'friend'
		})
	}

	handleGenderChange(event) {
		this.setState({
			gender: event.target.value
		});
	}

	handleInterestedInChange(event) {
		this.setState({
			interestedIn: event.target.value
		});
	}

	handleLocationChange(event) {
		this.setState({
			location: event.target.value
		});
	}

	handleBirthdayChange(event) {
		this.setState({
			birthday: event.target.value
		});
	}

	handleAgeMinChange(event) {
		this.setState({
			ageMin: event.target.value
		});
	}

	handleAgeMaxChange(event) {
		this.setState({
			ageMax: event.target.value
		});
	}

	didClickRegisterButton() {
		store.dispatch(RegisterActionCreator.register(this.state));
	}
}

const mapStateToProps = (state) => {
	return {
		facebookAuth: state.facebook.facebookAuth,
		facebookPicture: state.facebook.facebookPicture,
		facebookProfile: state.facebook.facebookProfile,
		profile: state.profile.profile,
		register: state.profile.register
	};
};

export default withRouter(connect(mapStateToProps)(Register));
