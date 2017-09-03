import React, {Component} from 'react';

class Contact extends Component {

	render() {
		return (
			<section id="contact" className="pt120 pb100">
				<div className="container">
					<div className="row">

						<div className="col-md-12 text-center pb20">
							<h2>Get In Touch<br/><strong>Contact Us</strong></h2>
							<p className="lead">We would like to <span className="color">hear from you</span></p>
						</div>

						<div className="col-md-8 col-md-offset-2 contact box-style">
							<div id="message-info"></div>
							<form id="contactform" method="post">

								<div className="col-sm-12">
									<input name="name" id="name" placeholder="Your Name *"/>
								</div>
								<div className="col-sm-6">
									<input name="email" id="email" placeholder="Your Email *"/>
								</div>
								<div className="col-sm-6">
									<input name="phone" id="phone" placeholder="Your Phone"/>
								</div>
								<div className="col-sm-12">
									<textarea name="message" rows="9" id="message" placeholder="Your Message *"></textarea>
								</div>
								<div className="col-md-12">
									<input type="submit" className="submit btn btn-lg btn-primary" id="submit" value="Send Message"/>
								</div>

							</form>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default Contact;
