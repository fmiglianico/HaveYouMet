/*global FB*/

import React, {Component} from 'react';

class FriendsSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showButtons: true,
			showSingleSelector: false
		}
	}

	getFriends() {
		FB.api(
			"/me/friends",
			function (response) {
				console.info(response);
				if (response && !response.error) {
				}
			}
		);
	}

	handleFriendIsSingleButtonClick() {
		this.setState({
			showButtons: false,
			showSingleSelector: true
		});
	}

	handleImSingleButtonClick() {
		this.setState({
			showButtons: false,
			showSingleSelector: false
		});
	}

	handleBackButtonClick() {
		this.setState({
			showButtons: true,
			showSingleSelector: false
		});
		this.getFriends();
	}

	render() {
		return (
			<div className="friends-selector">
				<div className="single-choice" style={{display: this.state.showButtons ? '' : 'none'}}>
					<button type="button" className="btn btn-primary" onClick={() => this.handleFriendIsSingleButtonClick()}>My friend is single</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleImSingleButtonClick()}>I'm single</button>
				</div>
				<div className="friends-choice" style={{display: this.state.showButtons ? 'none' : ''}}>
					<button type="button" className="btn btn-link" onClick={() => this.handleBackButtonClick()}>&lt; Back</button>
					<div className="choose-single" style={{display: this.state.showSingleSelector ? '' : 'none'}}>
						Which friend ?
					</div>
					<div className="choose-wingmen">
						Who will help you ?
					</div>
				</div>
			</div>
		);
	}
}

export default FriendsSelector;