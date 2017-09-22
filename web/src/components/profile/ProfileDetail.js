import React, { Component } from 'react';
import { connect } from 'react-redux'

import ProfileActionCreator from '../../actions/ProfileActionCreator';
import store from '../../stores/Store';

class ProfileDetail extends Component {

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.id) {
			if (!nextProps.profile.fetched
				&& !nextProps.profile.fetching
				&& !nextProps.profile.error) {
				store.dispatch(ProfileActionCreator.getSingle(this.props.match.params.id));
			} else if (nextProps.profile.fetched
				&& !nextProps.friends.fetched
				&& !nextProps.friends.fetching
				&& !nextProps.friends.error) {
				store.dispatch(ProfileActionCreator.getFriends(this.props.match.params.id));
			}
		}
	}

    render() {
		let profileDiv = null;
		if (this.props.profile.fetched) {
			profileDiv = (
				<div className="profile-detail row">
					<div className="profile-picture-wrapper col-md-4 col-sm-12">
						<div className="profile-picture" style={this.props.profile.data.pictureLarge ?
							{backgroundImage:`url(${this.props.profile.data.pictureLarge})`} : null}/>
					</div>

					<div className="profile-description col-md-8 col-sm-12">
						<h3><strong>{this.props.profile.data.name}</strong></h3>
						<h4>{this.props.profile.data.gender} - <strong>{this.props.profile.data.age}</strong></h4>
						<h5>City : {this.props.profile.data.location}</h5>
					</div>
				</div>
			);
		} else if (this.props.profile.fetching) {
			profileDiv = <div>Fetching Profile</div>;
		} else if (this.props.profile.error) {
			profileDiv = <div>Error while fetching profile</div>;
		}

		let friendsDiv = null;
		if (this.props.friends.fetched) {

			friendsDiv = this.props.friends.data.map(friend => {
				return (
					<div className="profile col-lg-2 col-sm-3 col-xs-4" key={friend.id}>
						<div className="profile-picture-wrapper">
							<div className="profile-picture" style={friend.pictureLarge ?
								{backgroundImage:`url(${friend.pictureLarge})`} : null}/>
						</div>

						<div className="profile-description">
							<h4><strong>{friend.name}</strong> - {friend.age}</h4>
						</div>
					</div>
				);
			});
		} else if (this.props.friends.fetching) {
			friendsDiv = <div>Fetching Friends</div>;
		} else if (this.props.friends.error) {
			friendsDiv = <div>Error while fetching friends</div>;
		}

        return (
        	<div>
				{profileDiv}
				<div className="row">
					{friendsDiv}
				</div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile.currentProfile.single,
		friends: state.profile.currentProfile.friends
	};
};

export default connect(mapStateToProps)(ProfileDetail);
