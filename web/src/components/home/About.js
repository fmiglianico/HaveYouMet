import React, {Component} from 'react';

class About extends Component {

	render() {
		return (
			<section id="about" className="pt100 pb90">
				<div className="container">
					<div className="row">

						<div className="col-md-12 text-center pb20">
							<h2>You friend is still single ?<br/><strong>You won't have any more excuses</strong></h2>
							<p className="lead">
								In just a few clicks, you will be able to get in touch with thousands of potential matches for your single friends,
								<br/>
								Be the provider of <span className="color">love opportunities</span>.
							</p>
						</div>

						<div className="col-sm-6 feature-left">
							<i className="icon-streetsign size-3x color"></i>
							<i className="icon-streetsign back-icon"></i>
							<div className="feature-left-content">
								<h4><strong>Get your single friends</strong><br/>On the right track</h4>
								<p>Vivamus congue diam vitae tortor imperdiet congue. Nullam sagittis, tristique diam, ut ullamcorper tellus. Cras porttitor massa.</p>
							</div>
						</div>
						<div className="col-sm-6 feature-left">
							<i className="icon-presentation size-3x color"></i>
							<i className="icon-presentation back-icon"></i>
							<div className="feature-left-content">
								<h4><strong>Build their profile</strong><br/>You know them best</h4>
								<p>Duis vel est nec sapien suscipit gravida. Integer vitae tortor dui. Donec libero quam, euismod sit amet enim ac, varius dictum.</p>
							</div>
						</div>
						<div className="col-sm-6 feature-left">
							<i className="icon-trophy size-3x color"></i>
							<i className="icon-trophy back-icon"></i>
							<div className="feature-left-content">
								<h4><strong>Be the best Wingman</strong><br/>You can be</h4>
								<p>Maecenas sit amet eros luctus dui volutpat sollicitudin id vitae est. Vivamus laoreet adipiscing metus vel fermentum. Sed velit.</p>
							</div>
						</div>
						<div className="col-sm-6 feature-left">
							<i className="icon-chat size-3x color"></i>
							<i className="icon-chat back-icon"></i>
							<div className="feature-left-content">
								<h4><strong>Chat online</strong><br/>With everyone involved</h4>
								<p>Discuss with potential matches, send their profile to other friends or to your single friend very easily.</p>
							</div>
						</div>

					</div>
				</div>
			</section>
		);
	}
}

export default About;
