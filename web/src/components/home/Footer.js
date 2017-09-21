import React, {Component} from 'react';

class Footer extends Component {

	render() {
		return (
			<footer id="footer" className="footer style-1 dark">

				<a href="#">
					<img src="wunderkind/img/assets/footer-logo.png" alt="#" className="mr-auto img-responsive"/>
				</a>
				<ul>
					<li><a href="https://www.twitter.com/" target="_blank" className="color"><i className="ion-social-twitter"/></a></li>
					<li><a href="https://www.facebook.com/" target="_blank" className="color"><i className="ion-social-facebook"/></a></li>
					<li><a href="https://www.linkedin.com/" target="_blank" className="color"><i className="ion-social-linkedin"/></a></li>
					<li><a href="https://www.pinterest.com/" target="_blank" className="color"><i className="ion-social-pinterest"/></a></li>
					<li><a href="https://plus.google.com/" target="_blank" className="color"><i className="ion-social-googleplus"/></a></li>
				</ul>
				<a href="#" target="_blank"><strong>© HaveYouMet 2017</strong></a>
				<p>Made with <i className="ion-heart"/> for great people.</p>

				<span><a className="scroll-top"><i className="ion-chevron-up"/></a></span>

			</footer>
		);
	}
}

export default Footer;
