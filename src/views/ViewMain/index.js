import React, { Component } from 'react';
import Slider from "react-slick";
import { Timeline } from 'react-twitter-widgets'

import './index.css';

class ViewMain extends Component {

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
    return (
      <div className="view-info">
      <Scene3D>
        
      </Scene3D>
      </div>
    );
  }
}

export default ViewMain;
