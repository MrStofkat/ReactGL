import React, { Component } from 'react';
import ButtonSocial from './ButtonSocial';
import copyToClipboard from '../../controller/CopyClipboard'

import './index.css';

class ShareLink extends Component {

  constructor(props) {
    super(props);
    this.connectionKey = this.props.connectionKey;
  }

  render() {
    return (
      <div className="container-share">
       <h2>Ready for sharing</h2>
       <span>Share the link below. <u> The link is valid as long as this browser tab is open.</u></span>
        <div className="container-share-url">
          <input
            value={this.props.shareUrl}
            type="text"
            id="share-url"
          />
          <img
            className="button-copy"
            src={require('../../assets/img/copy.svg')}
            onClick={()=> {copyToClipboard(this.props.shareUrl)}}
          />
        </div>
        <div className="share-buttons">
          <ButtonSocial type="whatsapp" shareUrl= {this.props.shareUrl}/>
          <ButtonSocial type="facebook" shareUrl= {this.props.shareUrl}/>
          <ButtonSocial type="mail" shareUrl= {this.props.shareUrl}/>
        </div>
      </div>
    );
  }
}

export default ShareLink;
