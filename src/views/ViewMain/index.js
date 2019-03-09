import React, { Component } from 'react';

import './index.css';
import Scene3D from '../../components/Scene3D';

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
      <div className="container-3d">
      <Scene3D>
      </Scene3D>
      </div>
    );
  }
}

export default ViewMain;
