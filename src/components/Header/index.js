import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import './index.css';
import '../../App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      isMenuOpen: false,
    };
  }

  closeMenu() {
    this.setState({isMenuOpen: false});
  }

  onMenuStateChange(state) {
    this.setState({isMenuOpen: state.isOpen})
  }

  render() {
    return (
      <header className="App-header">
        <div className="header-logo">
          <img src={require('../../assets/img/logo.svg')} className="App-logo" alt="logo" />
          <a href="/"><h1 className="App-title">BigFiles.app</h1></a>
        </div>
        <Menu
          isOpen={this.state.isMenuOpen}
          pageWrapId={ "page-wrap" }
          onStateChange={(state) => this.onMenuStateChange(state)}
          right
        >
          <Link onClick={() => this.closeMenu()} className="menu-item" to="/">Home</Link>
          <Link onClick={() => this.closeMenu()} className="menu-item" to="/info">Info</Link>
          <Link onClick={() => this.closeMenu()} className="menu-item" to="/download">Download</Link>
          <Link onClick={() => this.closeMenu()} className="menu-item" to="/news">News</Link>
        </Menu>
      </header>
    );
  }
}

export default Header;
