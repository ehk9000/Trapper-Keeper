import React, { Component } from 'react';
// import { connect } from 'react-redux';

class ListItem extends Component {
  render() {
    return (
      <div className="ListItem">
        <input type="text" defaultValue={this.props.item}/>
      </div>
    );
  }
}

export default ListItem;