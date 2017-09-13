import React from 'react';
import RegisterActionCreator from '../actions/RegisterActionCreator';
import store from '../stores/Store';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.didClickRegisterButton = this.didClickRegisterButton.bind(this);
	}

    render() {
        return (
            <section id="hero" className="hero-fullscreen parallax" data-overlay-dark="7">
                <div className="background-image">
                    <img src="wunderkind/img/backgrounds/bg-1.jpg" alt="#" />
                </div>

                <div className="container">
                    <div className="row col-md-6 col-md-push-3">
                        <h1>Register</h1>
						<label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleFirstNameChange} value={this.state.value}/>
                        <button className="btn btn-primary btn-sm btn-square" onClick={this.didClickRegisterButton}>Register</button>
                    </div>
                </div>
            </section>
        );
    }
    handleFirstNameChange(event) {
		this.setState({
			firstName: event.target.value
		});
	}

	didClickRegisterButton() {
        store.dispatch(RegisterActionCreator.register(this.state));
    }
}

export default Register;
