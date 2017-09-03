import React, {Component} from 'react';

import Navbar from './components/home/Navbar.js';
import Hero from './components/home/Hero.js';
import About from './components/home/About.js';
import Quotes from './components/home/Quotes.js';
import Facts from './components/home/Facts.js';
import Callout from './components/home/Callout.js';
import Contact from './components/home/Contact.js';
import Footer from './components/home/Footer.js';

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
				<Hero/>
				<About/>
				<Quotes/>
				<Facts/>
				<Callout/>
				<Contact/>
				<Footer/>
			</div>
		);
	}
}

export default App;
