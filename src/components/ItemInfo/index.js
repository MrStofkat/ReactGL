import React, { Component } from 'react';

class ItemInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="alinea">
        <div className="container-circle-icon">
          <img className="img-info" src={this.props.image}/>
        </div>
        <div className="think" >
          <h3>{this.props.title}</h3>
          <div dangerouslySetInnerHTML={{__html: this.props.text}}/>
        </div>
      </div>
    );
  }
}
export default ItemInfo;
