import React, { Component } from 'react';

import Navbar from './home/Navbar.js';
import Hero from './home/Hero.js';
import About from './home/About.js';
import Quotes from './home/Quotes.js';
import Facts from './home/Facts.js';
import Callout from './home/Callout.js';
import Contact from './home/Contact.js';
import Footer from './home/Footer.js';

import './App.css';

class App extends Component {
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
