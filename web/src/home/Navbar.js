import React, {Component} from 'react';

import FacebookActionCreators from '../actions/FacebookActionCreators';
import FacebookStore from '../stores/FacebookStore';
import FacebookLogin from '../components/FacebookLogin';
import FacebookPicture from '../components/FacebookPicture';

class Navbar extends Component {

	constructor() {
		super();
		this.state = this.getFacebookState();
	}

	getFacebookState() {
		return {
			accessToken: FacebookStore.accessToken,
			loggedIn: FacebookStore.loggedIn,
			userId: FacebookStore.userId,
			facebookPictureStatus: FacebookStore.facebookPictureStatus,
			facebookPictureUrl: FacebookStore.facebookPictureUrl
		}
	}

	componentDidMount() {
		FacebookActionCreators.initFacebook();
		FacebookStore.addChangeListener(() => this._onFacebookChange());
	}

	componentWillUnmount() {
		FacebookStore.removeChangeListener(this._onFacebookChange);
	}

	_onFacebookChange() {
		this.setState(this.getFacebookState());
	}

	render() {
		return (
			<nav className="navbar nav-down" data-fullwidth="true" data-menu-style="transparent" data-animation="shrink">
				<div className="container">

					<div className="navbar-header">
						<div className="container">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar top-bar"></span>
								<span className="icon-bar middle-bar"></span>
								<span className="icon-bar bottom-bar"></span>
							</button>
							<a className="navbar-brand to-top" href="#">
								<img src="wunderkind/img/assets/logo-light.png" className="logo-light" alt="#"/>
								<img src="wunderkind/img/assets/logo-dark.png" className="logo-dark" alt="#"/>
							</a>
						</div>
					</div>

					<div id="navbar" className="navbar-collapse collapse">
						<div className="container">
							<ul className="nav navbar-nav menu-right">

								<li><a href="#">Home</a></li>
								<li><a href="#">About</a></li>
								<li><a href="#">Services</a></li>
								<li><a href="#">Work</a></li>
								<li className="dropdown megamenu vos">
									<a className="dropdown-toggle">Elements<i className="ion-ios-arrow-down"></i></a>
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
								<li><a href="#">Contact</a></li>

								<li className="nav-separator"></li>

								<span className="dropdown myprofilemenu">
									<a className="dropdown-toggle">
										<div className="fb-login">
											{!this.state.loggedIn ? <FacebookLogin /> : null}
											{this.state.loggedIn ? (
												<FacebookPicture
													facebookPictureUrl={this.state.facebookPictureUrl} />) : null}
										</div>
									</a>
									<div className="dropdown-menu fullwidth">
										<div className="myprofilemenu-content withdesc">
											<ul>
												<li><a href="#">My Profile</a></li>
												<li><a href="#">Logout</a></li>
											</ul>
										</div>
									</div>
								</span>
							</ul>

						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
