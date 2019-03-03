import React, { Component } from 'react';
import './index.css';

class ViewDownload extends Component {
  render() {
    return (
      <div className="view-info">
        <h3>Always, always a direct connection</h3>
        <span>
          While some products claim they are peer to peer, in many cases  your data will still flow through their servers when a direct path cannot be made. Take Skype for example : it can work peer to peer, but it’s usually relays the data over their own servers when the connection goes through a symmetric network.
          We put our efforts and money into finding that direct path, rather than to buy some heavy duty servers to make you think it’s peer to peer.
        </span>
        <div>
        <img className="img-info" src={require('../../assets/img/normal-share.png')}/>
        <img className="img-info" src={require('../../assets/img/toffeeshare-share.png')}/>
        </div>
        <h3>End-to-end encryption</h3>
        <span>
          We are constantly improving on our encryption layer. While we might have made the Validata protocol in-house, we do not take any chances with encryption. To ensure the safety of your data we only rely on proven, standardized encryption techniques. ToffeeShare currently uses an implementation of <a href="https://en.wikipedia.org/wiki/Datagram_Transport_Layer_Security">DTLS 1.2.</a> If you have any questions about our security or encryption, please do not hesitate to contact us at technical@toffeeshare.com. Also, there’s always room for more security experts in our team.
        </span>
        <h3>Validata Protocol</h3>
        <span>
          The Validata protocol is a protocol on top of UDP that makes it reliable. Compared to the TCP protocol it uses only ¼ of the feedback packets.
          Validata was designed to keep feedback to a minimum while keeping 100% data integrity. It’s a very modern protocol that supports end-to-end encryption and ‘senses’ changes in stability of the network, so it can anticipate on that. The low number of feedback packets and small transport related footprint makes it a very lightweight protocol, ensuring fast and reliable transfers without the chance of overloading your network.
          Here are some results from tests when sending a 1GB file from one computer to another on WAN network. Note that transfer speeds will be even higher when using a cable.
        </span>
      </div>
    );
  }
}

export default ViewDownload;
