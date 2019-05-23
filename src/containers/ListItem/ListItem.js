import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListItem extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="ListItem">
        <input type="text" value={this.props.item}/>
      </div>
    );
  }
}

export default ListItem;