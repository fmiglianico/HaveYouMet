import React, { Component } from 'react';

class RegisterAsSingle extends Component {

    render() {

		const selectOptions = [];
		for (let i = 18; i < 100; i++) {
			selectOptions.push(<option value={i}>{i}</option>);
		}

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

				<label htmlFor="ageMin">Age minimum</label>
				<select id="ageMin" onChange={this.props.handleAgeMinChange}
					   value={this.props.ageMin}>
					{selectOptions}
				</select>

				<label htmlFor="ageMax">Age maximum</label>
				<select id="ageMin" onChange={this.props.handleAgeMaxChange}
						value={this.props.ageMax}>
					{selectOptions}
				</select>

			</div>
        );
    }
}

export default RegisterAsSingle;
