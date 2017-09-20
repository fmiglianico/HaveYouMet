import React, { Component } from 'react';

class ErrorPage extends Component {
    render() {
        return (
			<section id="error" className="first-section col-md-12 text-center">
				<h1><strong>Error {this.props.code}</strong></h1>
				<p className="lead">{this.props.message}</p>
			</section>
        );
    }
}

export default ErrorPage;
