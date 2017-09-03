import React, {Component} from 'react';

import FacebookLogin from '../FacebookLogin';

class NavbarProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			connected: false,
			facebookInfo: {
				name: null,
				id: null
			}
		};
	}

	render() {
		let profilePictureURL = 'http://graph.facebook.com/v2.10/' + this.state.facebookInfo.id + '/picture';
		return (
			<div className="profile-connected"
				 style={{backgroundImage: profilePictureURL}}>
			</div>
		);
	}
}

export default NavbarProfile;
