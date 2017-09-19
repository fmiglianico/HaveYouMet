import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FacebookLogin from '../FacebookLogin';
import FacebookPicture from '../FacebookPicture';
import FacebookLogout from "../FacebookLogout";

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			facebookAuth: props.facebookAuth,
			facebookPicture: props.facebookPicture,
			profile: props.profile
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

								<li><a href="#" className="anchor">Home</a></li>
								<li className="dropdown megamenu vos">
									<a className="dropdown-toggle">Elements<i className="ion-ios-arrow-down"/></a>
									<ul className="dropdown-menu fullwidth">
										<li className="megamenu-content withdesc">
											<div className="col-md-3 mg-col">
												<ul>
													<li><a href="#">Accordion</a></li>
													<li><a href="#">Buttons</a></li>
												</ul>
											</div>
											<div className="col-md-3 mg-col">
												<ul>
													<li><a href="#">Tabs</a></li>
													<li><a href="#">Progress Circles</a></li>
												</ul>
											</div>
										</li>
									</ul>
								</li>
								<li><a href="#" className="anchor">Contact</a></li>

								<li className="nav-separator"/>

								<li className="dropdown myprofilemenu">
									<a className="dropdown-toggle">
										<div className="fb-login">
											{!this.props.facebookAuth.fetched || this.props.profile.error ?
												<FacebookLogin /> :
												(this.props.profile.data ?
													<FacebookPicture facebookPictureUrl={this.props.facebookPicture.data} /> :
													<Redirect to="/register"/>
												)
											}
										</div>
									</a>
									{this.props.facebookAuth.fetched && this.props.facebookPicture.fetched ? (
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
