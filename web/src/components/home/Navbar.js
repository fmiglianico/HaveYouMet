import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import FacebookLogin from '../FacebookLogin';
import FacebookPicture from '../FacebookPicture';
import FacebookLogout from "../FacebookLogout";

import ProfileActionCreator from '../../actions/ProfileActionCreator';
import store from '../../stores/Store';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			facebookAuth: props.facebookAuth,
			facebookPicture: props.facebookPicture,
			profile: props.profile
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.profile.fetched && !nextProps.profile.fetching && !nextProps.profile.error
			&& nextProps.facebookAuth.fetched) {
			store.dispatch(ProfileActionCreator.getProfile(nextProps.facebookAuth.data.userID));
		}
	}

	render() {
		return (
			<nav className="navbar nav-down" data-fullwidth="true" data-menu-style="transparent" data-animation="shrink">
				<div className="container">

					<div className="navbar-header">
						<div className="container">
							<a className="navbar-brand to-top" href="#">
								<img src="wunderkind/img/assets/logo-light.png" className="logo-light" alt="#"/>
								<img src="wunderkind/img/assets/logo-dark.png" className="logo-dark" alt="#"/>
							</a>
						</div>
					</div>

					<div id="navbar" className="navbar-collapse collapse">
						<div className="container">
							<ul className="nav navbar-nav menu-right">

								<li><Link to="/">Home</Link></li>
								{
									this.props.profile.fetched ?
										<li><Link to="/dashboard">Dashboard</Link></li> :
										null
								}
								<li className="nav-separator"/>

								<li className="dropdown myprofilemenu">
									<a className="dropdown-toggle">
										<div className="fb-login">
											{!this.props.facebookAuth.fetched || this.props.profile.fetching ?
												<FacebookLogin /> :
												(this.props.profile.error ?
													<Redirect to="/register"/> :
													<FacebookPicture facebookPictureUrl={this.props.facebookPicture.data} />
												)
											}
										</div>
									</a>
									{this.props.profile.fetched ? (
										<ul className="dropdown-menu fullwidth">
											<li className="myprofilemenu-content withdesc">
												<div className="col-md-3 mg-col">
													<ul>
														<li><a href="#">My Profile</a></li>
														<li>
															<FacebookLogout/>
														</li>
													</ul>
												</div>
											</li>
										</ul>) : null}
								</li>
							</ul>

						</div>
					</div>
				</div>
			</nav>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		facebookAuth: state.facebook.facebookAuth,
		facebookPicture: state.facebook.facebookPicture,
		profile: state.profile.profile
	};
};

export default connect(mapStateToProps)(Navbar);
