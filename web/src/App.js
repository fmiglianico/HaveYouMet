import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './components/home/Navbar';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Quotes from './components/home/Quotes';
import Facts from './components/home/Facts';
import Callout from './components/home/Callout';
import Contact from './components/home/Contact';
import Footer from './components/home/Footer';
import Register from './components/Register';

import store from './stores/Store'
import FacebookActionCreators from './actions/FacebookActionCreators';

import './App.css';


const APP_ID = '1110690499060538';
const APP_VERSION = 'v2.5';

class App extends Component {
	componentDidMount() {
		store.dispatch(FacebookActionCreators.loadFacebookSDK(APP_ID, APP_VERSION));
	}

	render() {
		return (
			<div>
				<Navbar/>
				<Route path="/register" exact={true} component={Register}/>
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
				<Footer/>
			</div>
		);
	}
}

export default App;
