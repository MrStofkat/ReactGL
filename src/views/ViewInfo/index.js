import React, { Component } from 'react';
import Slider from "react-slick";
import ItemInfo from '../../components/ItemInfo';
import './index.css';

class ViewInfo extends Component {

  constructor(props) {
    super(props);
    document.body.style.background = 'white';

  }

  componentDidMount() {
    document.getElementsByClassName("App-title")[0].style.color = '#333';
    [...document.getElementsByClassName("bm-burger-bars")].forEach((element) => {
      element.style.background = '#333';
    });
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (

      <div className="view-info">
        <div className="container-intro">
          <div className="banner-row">
            <div className="container-circle-icon-big">
              <img className="banner-img" src={require('../../assets/img/logo.svg')}/>
            </div>
          </div>
          <div className="banner-row">
            <h1>Making sharing sweet</h1>
          </div>
        </div>
        <div className="container-intro-text">
          BigFiles.app is part of the ToffeeShare family: a direct and secure way of sending files. We made these application  because uploading big or large quantities of files is such a hassle.
          When we send large file to colleagues or friends we're forced to send it to a third party first with many limitations like filesize limit.
          With no good solutions in sight we vowed to change this. That's why has:
        </div>
          <ItemInfo
            title="Always, always a direct connection"
            text="We always find a direct path from sender to receiver. This means the fastest possible transfer speed. If you're both on the same network your data doesn't even have to leave the building."
            image={require('../../assets/img/direct.svg')}
          />
          <ItemInfo
            title="End-to-end encryption"
            text="We grealty value the safety of your data. That's why we use the latest in industry standards when it comes to security. We currently use an implementation of <a href='https://en.wikipedia.org/wiki/Datagram_Transport_Layer_Security'>DTLS 1.2.</a> Your data is encrypted end to end and can only be read by your receiver (and you of course)."
            image={require('../../assets/img/safe.svg')}
          />
          <ItemInfo
            title="No storage online"
            text="When the transfer is complete your files are no longer on the internet, so there's no risk of anyone hacking a server to get to your files: it simply isn't there."
            image={require('../../assets/img/breeze.svg')}
          />
          <ItemInfo
            title="State of the art technology"
            text="We keep up to date with the latest and greatest when it comes to network security and new ways to transfer data. With BigFiles we make sure to have the most reliable way to send your files, also in the future."
            image={require('../../assets/img/bulb.svg')}
          />
      </div>
    );
  }
}

export default ViewInfo;
