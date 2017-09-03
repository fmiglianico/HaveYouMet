import React, {Component} from 'react';

class Callout extends Component {

	render() {
		return (
			<section className="parallax light bg-img-9" data-overlay-light="9">
				<div className="background-image">
					<img src="wunderkind/img/backgrounds/bg-5.jpg" alt="#"/>
				</div>
				<div className="container pt100 pb100">
					<div className="row pt20">

						<div className="col-md-12 text-center">
							<h2>Ready to <span className="bold">Help</span> Your Single Friends ?</h2>
							<p className="lead">Use <span className="bold">HaveYouMet</span> to bring some more <span className="color">Happiness</span> into their lives</p>
							<a href="#" target="_blank" className="btn btn-md btn-primary btn-appear mt30">
								<span>Start Now <i className="ion-checkmark"></i></span>
							</a>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default Callout;
