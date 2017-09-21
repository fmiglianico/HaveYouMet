import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from './components/home/Navbar';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Quotes from './components/home/Quotes';
import Facts from './components/home/Facts';
import Callout from './components/home/Callout';
import Contact from './components/home/Contact';
import Footer from './components/home/Footer';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import ProfileBrowser from './components/profile/ProfileBrowser';

import DefaultDataCreator from './scripts/DefaultDataCreator';

import store from './stores/Store';
import FacebookActionCreator from './actions/FacebookActionCreator';

import './App.css';


const APP_ID = '1110690499060538';
const APP_VERSION = 'v2.8';

class App extends Component {
	componentWillMount() {
		store.dispatch(FacebookActionCreator.loadSDK(APP_ID, APP_VERSION));
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.facebookSDKFetched && nextProps.facebookSDKFetched) {
			store.dispatch(FacebookActionCreator.checkStatus());
		}
	}

	render() {
		return (
			<div>
				<Navbar/>
				<Switch>
					<Route path="/register" exact={true} component={Register}/>
					<Route path="/dashboard" component={ProfileBrowser}/>
					<Route path="/" exact={true} render={() => (
						<div>
							<Hero/>
							<About/>
							<Quotes/>
							<Facts/>
							<Callout/>
							<Contact/>
						</div>
					)} />

					<Route path="/generate_users" exact={true} component={DefaultDataCreator} />
					<Route render={() => (
						<ErrorPage code="404" message="Page not found"/>
					)} />
				</Switch>
				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		facebookSDKFetched: state.facebook.facebookSDK.fetched,
		facebookAuth: state.facebook.facebookAuth,
		profile: state.profile
	};
};

export default withRouter(connect(mapStateToProps)(App));
