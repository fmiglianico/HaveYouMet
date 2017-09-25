import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class Hero extends Component {

	render() {
		return (
			<section id="hero" className="hero-fullscreen parallax" data-overlay-dark="7">
				<div className="background-image">
					<img src="/wunderkind/img/backgrounds/bg-1.jpg" alt="#" />
				</div>

				<div className="container">
					<div className="row">

						<div className="hero-content-slider mt20">
							<div>
								<h1>Haaave you met ...<br/><strong>... My friend ?</strong></h1>
								<p className="lead">We all have single friends -- Find the perfect match for them.</p>
								<Link to="/register" className="btn btn-lg btn-primary btn-scroll">Start creating <i className="ion-heart"/></Link>
							</div>

							<div>
								<h1>Haaave you met ...<br/><strong>... My friend ?</strong></h1>
								<p className="lead">We all have single friends -- Find the perfect match for them.</p>
								<Link to="/register" className="btn btn-lg btn-primary btn-scroll">Start creating <i className="ion-heart"/></Link>
							</div>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(Hero);
