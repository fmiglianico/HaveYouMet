import React, {Component} from 'react';

class Quotes extends Component {

	render() {
		return (
			<section id="quotes" className="parallax pt100 pb90" data-overlay-dark="8">
				<div className="background-image">
					<img src="wunderkind/img/backgrounds/bg-4.jpg" alt="#" />
				</div>
				<div className="container">
					<div className="row">

						<div className="col-md-12">
							<div className="quote-slider navigation-thin container white text-center" data-autoplay="true" data-speed="2000">
								<div>
									<h2>
										<i className="vossen-quote color"></i>
										A Perfect Design is <strong>Passion, Dedication,</strong><br/>and a lots of Coffee
										<i className="vossen-quote color"></i>
									</h2>
									<p className="label label-primary">Wunderkind Team</p>
								</div>
								<div>
									<h2>
										<i className="vossen-quote color"></i>
										The Difference between ordinary and extraordinary<br/>is <strong>just that little extra</strong>
										<i className="vossen-quote color"></i>
									</h2>
									<p className="label label-primary">Albert Einstein</p>
								</div>
								<div>
									<h2>
										<i className="vossen-quote color"></i>
										<strong>The Desire to Create</strong> is One of the Deepest Yearnings of the Human Soul
										<i className="vossen-quote color"></i>
									</h2>
									<p className="label label-primary">Dieter F. Uchtdorf</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default Quotes;
