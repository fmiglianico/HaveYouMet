import React from 'react';

export default class FacebookPicture extends React.Component {

    render() {
        return (
            <div className="fb-login-connected ">
                <img src={this.props.facebookPictureUrl} alt="Facebook" className="img-circle"></img>
				<i className="ion-chevron-down"></i>
            </div>
        );
    }
}