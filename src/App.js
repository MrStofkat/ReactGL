import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Notifications from './components/Notifications';
import Header from './components/Header';
import ViewMain from './views/ViewMain';
import ViewInfo from './views/ViewInfo';
import ViewNews from './views/ViewNews';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <Router>
          <div>
            <Header/>
            <div className="App">
              <Route exact path="/" component={ViewMain} />
              <Route exact path="/info" component={ViewInfo} />
              <Route exact path="/news" component={ViewNews} />

            </div>
          </div>
        </Router>
        <Notifications/>
      </div>
    );
  }
}

export default App;
