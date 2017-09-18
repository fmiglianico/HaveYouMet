import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterAsSingle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			gender: 'male',
			interestedIn: 'female',
			birthday: '',
			location: ''
		};

		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleInterestedInChange = this.handleInterestedInChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.loaded && nextProps.facebookProfile.fetched) {
			this.setState({
				gender: nextProps.facebookProfile.data.gender,
				interestedIn: nextProps.facebookProfile.data.gender === 'male' ? 'female' : 'male',
				birthday: nextProps.facebookProfile.data.birthday,
				location: nextProps.facebookProfile.data.location.name,
				loaded: true
			});
		}
	}

    render() {
        return (
			<div>

				<label>Gender</label>
				<div>
					<label className="radio-inline">
						<input type="radio" name="gender" onChange={this.handleGenderChange}
							   defaultChecked={this.state.gender !== 'female'} value="male"/>
						Male
					</label>
					<label className="radio-inline">
						<input type="radio" name="gender" onChange={this.handleGenderChange}
							   defaultChecked={this.state.gender === 'female'} value="female"/>
						Female
					</label>
				</div>

				<label>Interested in</label>
				<div>
					<label className="radio-inline">
						<input type="radio" name="interestedIn" onChange={this.handleInterestedInChange}
							   defaultChecked={this.state.interestedIn === 'male'}/>
						Male
					</label>
					<label className="radio-inline">
						<input type="radio" name="interestedIn" onChange={this.handleInterestedInChange}
							   defaultChecked={this.state.interestedIn !== 'male'}/>
						Female
					</label>
				</div>

				<label htmlFor="birthday">Birthday</label>
				<input type="text" id="birthday" onChange={this.handleBirthdayChange}
					   value={this.state.birthday}/>

				<label htmlFor="location">Location</label>
				<input type="text" id="location" onChange={this.handleLocationChange}
					   value={this.state.location}/>

				<button className="btn btn-primary btn-sm btn-round" onClick={this.props.register}>
					Register
				</button>

			</div>
        );
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
}

const mapStateToProps = (state) => {
	return {
		facebookAuth: state.facebook.facebookAuth,
		facebookPicture: state.facebook.facebookPicture,
		facebookProfile: state.facebook.facebookProfile
	};
};

export default connect(mapStateToProps)(RegisterAsSingle);
