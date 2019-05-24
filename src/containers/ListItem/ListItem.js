import React, { Component } from 'react';
// import { connect } from 'react-redux';

class ListItem extends Component {
  render() {
    return (
      <div className="ListItem">
        <input type="text" className="item-input" defaultValue={this.props.item}/>
      </div>
    );
  }
}

export default ListItem;