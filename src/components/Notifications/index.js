import React, { Component } from 'react';
import './index.css';

const STATUS_COLORS = {
  'normal': '#333',
  'warning': '#000',
};

class Notify {

  constructor() {
    if(!notify) {
      notify = this;
      this.notifications = [];
    }
  }

  send(text, type, timeout) {
    this.notifications.push({ 
      message:text,
      type: type,
      timeout: (timeout / 1000),
    });
  }

}

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
    };
    setInterval(()=> {
      if (notify.notifications.length > 0) {
        let notification = notify.notifications.pop();
        this.setState({message: undefined})
        this.setState({
          message: notification.message,
          type: notification.type,
          timeout: notification.timeout,
        })
      }
    }, 200);
  }

  renderNotification() {
    return (this.state.message && 
      <div 
        style={{
          backgroundColor: STATUS_COLORS[this.state.type], 
          animation: `show ease-in ${this.state.timeout}s forwards`
        }}
        className="notification"
      >
        {this.state.message}
      </div>
      );
  }

  render() {
    return (
      <div className="container-notifications">
        {this.renderNotification()}
      </div>
    );
  }

}

var notify = new Notify();
export default Notifications;
export {notify};
