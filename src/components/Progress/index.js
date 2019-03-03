import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import './index.css';


class Progress extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container-progress">
        <CircularProgressbar
          percentage={this.props.percentage}
          text={`${this.props.percentage}%`}
          strokeWidth={1}
          styles={{
            background: {
              fill: '#00000022',
            },
            text: {
              fill: '#fff',
            },
            path: {
              stroke: '#fff',
            },
            trail: { stroke: '#333' },
          }}
        />
        <h2 className="label-speed">{this.props.isFinished ? 'Transfer completed' : `Speed: ${this.props.speed} Mbyte/s` }</h2>
      </div>
    );
  }
}
// {`${this.props.isFinished ? 'Transfered with an average speed of' : ''} ${this.props.speed} Mbyte/sec`}
export default Progress;
