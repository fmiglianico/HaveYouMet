import React, {Component} from 'react';
import {connect} from 'react-redux';

import RegisterActionCreator from '../actions/RegisterActionCreator';
import FacebookActionCreator from '../actions/FacebookActionCreator';
import store from '../stores/Store';
import RegisterAsFriend from './RegisterAsFriend'
import RegisterAsSingle from './RegisterAsSingle'

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {
				name: '',
				gender: 'male',
				interestedIn: 'female',
				type: '',
				birthday: '',
				location: '',
				facebookId: ''
			}
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.didClickRegisterButton = this.didClickRegisterButton.bind(this);
		this.didClickSingleButton = this.didClickSingleButton.bind(this);
		this.didClickFriendButton = this.didClickFriendButton.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.profile.name && nextProps.facebookAuth.fetched
			&& !nextProps.facebookProfile.fetching && !nextProps.facebookProfile.fetched) {
			store.dispatch(FacebookActionCreator.retrievePersonalInfo());
		} else if (!this.state.profile.name && nextProps.facebookProfile.fetched) {
			this.setState({
				profile: {
					name: nextProps.facebookProfile.data.first_name,
					gender: nextProps.facebookProfile.data.gender,
					interestedIn: nextProps.facebookProfile.data.gender === 'male' ? 'female' : 'male',
					birthday: nextProps.facebookProfile.data.birthday,
					location: nextProps.facebookProfile.data.location.name,
					facebookId: nextProps.facebookAuth.data.userID
				}
			});
		}
	}

	render() {
		return (
			<section id="register" className="blog">
				{/*<div className="background-image">
					<img src="wunderkind/img/backgrounds/bg-1.jpg" alt="#"/>
				</div>*/}

				<div className="container">
					<div className="row col-md-6 col-md-push-3 form">
						<h1>Register</h1>

						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" onChange={this.handleFirstNameChange}
							   value={this.state.profile.name}/>

						<div className="buttons-tabs-centered">

							<ul id="buttonTabs" className="nav-tabs nav-tabs-center register-choice-button">
								<li><a href="#tab-single" onClick={this.didClickSingleButton}>I'm single</a></li>
								<li><a href="#tab-friend" onClick={this.didClickFriendButton}>I'm helping a friend</a>
								</li>
							</ul>

							<div className="tab-content">
								<div className="tab-pane active">
									{ this.state.profile.type === 'single' ? <RegisterAsSingle register={this.didClickRegisterButton}/> : null }
									{ this.state.profile.type === 'friend' ? <RegisterAsFriend register={this.didClickRegisterButton}/> : null }
								</div>
							</div>

						</div>
					</div>
				</div>
			</section>
		)
	}

	handleFirstNameChange(event) {
		this.setState({
			profile: {
				name: event.target.value
			}
		});
	}

	handleTypeChange(event) {
		this.setState({
			profile: {
				type: event.target.value
			}
		})
	}

	didClickSingleButton() {
		this.setState({
			profile: {
				type: 'single'
			}
		})
	}

	didClickFriendButton() {
		this.setState({
			profile: {
				type: 'friend'
			}
		})
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

export default connect(mapStateToProps)(Register);
