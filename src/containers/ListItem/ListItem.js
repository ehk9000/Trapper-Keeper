import React, { Component } from 'react';
// import { connect } from 'react-redux';

class ListItem extends Component {
  render() {
    return (
      <div className="ListItem">
        <input type="checkbox" id="item-input"/>
        <label 
          className="item-label" 
          contentEditable="true">
          {this.props.item}
        </label>
      </div>
    );
  }
}

export default ListItem;