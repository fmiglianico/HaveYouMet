import React, { Component } from 'react';

class ProfileThumbnail extends Component {
    render() {
        return (
            <div>
				<div className="profile-picture-wrapper">
					<div className="profile-picture" style={this.props.profile.pictureLarge ?
					{backgroundImage:`url(${this.props.profile.pictureLarge})`} : null}/>
				</div>

				<div className="profile-description">
					<h3><strong>{this.props.profile.name}</strong> - Nat : {this.props.profile.nationality}</h3>
					<h4>{this.props.profile.gender} - Birthday : {this.props.profile.birthday}</h4>
					<h5>City : {this.props.profile.location}</h5>
				</div>

				<div className="profile-buttons">
					<button className="btn btn-primary btn-round"><i className="ion-heart"/></button>
					<button className="btn btn-default btn-round"><i className="ion-close"/></button>
				</div>
            </div>
        );
    }
}

export default ProfileThumbnail;
