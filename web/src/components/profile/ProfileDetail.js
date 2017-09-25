import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProfileActionCreator from '../../actions/ProfileActionCreator';
import store from '../../stores/Store';

class ProfileDetail extends Component {

	componentWillMount() {
		this.initProfile(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.initProfile(nextProps);
	}

	initProfile(props) {
		if (props.match.params.id) {
			if ((!props.profile.fetched
				&& !props.profile.fetching
				&& !props.profile.error)
				|| props.match.params.id !== props.profile.fetchingId) {
				store.dispatch(ProfileActionCreator.getSingle(props.match.params.id));
			} else if (props.profile.fetched
				&& !props.friends.fetched
				&& !props.friends.fetching
				&& !props.friends.error) {
				store.dispatch(ProfileActionCreator.getFriends(props.match.params.id));
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
        	<div className="container center-block">
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

export default withRouter(connect(mapStateToProps)(ProfileDetail));
