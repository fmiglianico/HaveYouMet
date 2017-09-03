import React, {Component} from 'react';

class Facts extends Component {

	render() {
		return (
			<section id="fun-facts" data-animate="true">
				<div className="container-fluid">
					<div className="row">

						<div className="col-sm-3 counter">
							<h1 className="bold" data-count="0"></h1>
							<h5>Singles</h5>
						</div>
						<div className="col-sm-3 counter">
							<h1 className="bold" data-count="0"></h1>
							<h5>Wingmen</h5>
						</div>
						<div className="col-sm-3 counter">
							<h1 className="bold" data-count="0"></h1>
							<h5>Cities</h5>
						</div>
						<div className="col-sm-3 counter">
							<h1 className="bold" data-count="0"></h1>
							<h5>Nationalities</h5>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default Facts;
