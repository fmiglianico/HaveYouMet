import React, { Component } from 'react';

class RegisterAsSingle extends Component {

    render() {
        return (
			<div>

				<label>Gender</label>
				<div>
					<label className="radio-inline">
						<input type="radio" name="gender" onChange={this.props.handleGenderChange}
							   defaultChecked={this.props.gender !== 'female'} value="male"/>
						Male
					</label>
					<label className="radio-inline">
						<input type="radio" name="gender" onChange={this.props.handleGenderChange}
							   defaultChecked={this.props.gender === 'female'} value="female"/>
						Female
					</label>
				</div>

				<label>Interested in</label>
				<div>
					<label className="radio-inline">
						<input type="radio" name="interestedIn" onChange={this.props.handleInterestedInChange}
							   defaultChecked={this.props.interestedIn === 'male'} value="male"/>
						Male
					</label>
					<label className="radio-inline">
						<input type="radio" name="interestedIn" onChange={this.props.handleInterestedInChange}
							   defaultChecked={this.props.interestedIn !== 'male'} value="female"/>
						Female
					</label>
				</div>

				<label htmlFor="birthday">Birthday</label>
				<input type="text" id="birthday" onChange={this.props.handleBirthdayChange}
					   value={this.props.birthday}/>

				<label htmlFor="location">Location</label>
				<input type="text" id="location" onChange={this.props.handleLocationChange}
					   value={this.props.location}/>

			</div>
        );
    }
}

export default RegisterAsSingle;
