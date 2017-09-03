import React, {Component} from 'react';

class Hero extends Component {

	render() {
		return (
			<section id="hero" className="hero-fullscreen parallax" data-overlay-dark="7">
				<div className="background-image">
					<img src="wunderkind/img/backgrounds/bg-1.jpg" alt="#" />
				</div>

				<div className="container">
					<div className="row">

						<div className="hero-content-slider mt20">
							<div>
								<h1>Haaave you met ...<br/><strong>... My friend ?</strong></h1>
								<p className="lead">We all have single friends -- Find the perfect match for them.</p>
								<a href="#about" className="btn btn-lg btn-primary btn-scroll">Start creating <i className="ion-heart"></i></a>
							</div>

							<div>
								<h1>Haaave you met ...<br/><strong>... My friend ?</strong></h1>
								<p className="lead">We all have single friends -- Find the perfect match for them.</p>
								<a href="#about" className="btn btn-lg btn-primary btn-scroll">Start sending <i className="ion-heart"></i></a>
							</div>

						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default Hero;
