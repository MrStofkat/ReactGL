import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Notifications from './components/Notifications';
import Header from './components/Header';
import ViewShare from './views/ViewShare';
import ViewInfo from './views/ViewInfo';
import ViewDownloadApp from './views/ViewDownloadApp';
import ViewNews from './views/ViewNews';
import ViewApp from './views/ViewApp';

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
              <Route exact path="/" component={ViewShare} />
              <Route exact path="/info" component={ViewInfo} />
              <Route exact path="/download" component={ViewDownloadApp} />
              <Route exact path="/news" component={ViewNews} />
              <Route exact path="/app" component={ViewApp} />

            </div>
          </div>
        </Router>
        <Notifications/>
      </div>
    );
  }
}

export default App;
