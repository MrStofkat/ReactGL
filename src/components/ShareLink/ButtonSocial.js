import React, { Component } from 'react';
import DetectBrowser from '../../controller/DetectBrowser';

const SOCIAL_IMAGES = {
  'whatsapp': require('../../assets/img/whatsapp.png'),
  'facebook': require('../../assets/img/facebook.png'),
  'mail': require('../../assets/img/email.png'),
}
class ButtonSocial extends Component {

  constructor(props) {
    super(props);
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked() {
    let shareUrl = '';
    switch(this.props.type) {
      case 'whatsapp':
        shareUrl = DetectBrowser.isMobile() ? "whatsapp://send?text=BigFiles%20filetransfer:%20" + this.props.shareUrl : "https://web.whatsapp.com/send?text=BigFiles%20filetransfer:%20" + this.props.shareUrl;
        break;
      case 'facebook':
        shareUrl =  "https://www.facebook.com/sharer/sharer.php?mode=message&u=" + this.props.shareUrl;
        break;
      case 'mail':
        shareUrl = "mailto:?subject=I%20shared%20a%20file%20with%20you&body=Download%20the%20file%20at " + this.props.shareUrl;
        break;
    }
    window.open(shareUrl, '_blank');
  }

  render() {
    return (
      <div className="button-social" onClick={this.onButtonClicked}>
        <img
          className="image-share"
          src={SOCIAL_IMAGES[this.props.type]}
        />
      </div>
    );
  }
}

export default ButtonSocial;
