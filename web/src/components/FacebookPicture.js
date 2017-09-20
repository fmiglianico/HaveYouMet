import React, { Component } from 'react';
import { connect } from 'react-redux';

import FacebookActionCreator from '../actions/FacebookActionCreator';
import store from '../stores/Store';

class FacebookPicture extends Component {

	constructor(props) {
		super(props);
		this.state = {
			facebookPictureURL:  props.facebookPicture.fetched ?  props.facebookPicture.data.url : null,
			facebookUserId: null
		};
	}

	componentWillMount() {
		if (!this.props.facebookPicture.fetched && !this.props.facebookPicture.fetching && this.props.facebookUserId) {
			store.dispatch(FacebookActionCreator.loadPicture(this.props.facebookUserId));
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.facebookPictureURL && nextProps.facebookPicture.fetched) {
			this.setState({
				facebookPictureURL: nextProps.facebookPicture.data.url
			});
		} else if (!this.state.facebookPictureURL && !nextProps.facebookPicture.fetching && nextProps.facebookUserId) {
			store.dispatch(FacebookActionCreator.loadPicture(nextProps.facebookUserId));
		}
	}

    render() {
        return (
            <div className="fb-login-connected ">
                <img src={this.state.facebookPictureURL} alt="Facebook" className="img-circle"/>
				<i className="ion-chevron-down"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		facebookPicture: state.facebook.facebookPicture,
		facebookUserId: state.facebook.facebookAuth.data.userID
	};
};

export default connect(mapStateToProps)(FacebookPicture);