import React, { Component } from 'react';
// import { connect } from 'react-redux';

class ListItem extends Component {
  state = {
    listItem: this.props.item
  }

  handleChange = (e) => {
    this.setState({
      listItem: e.target.value
    });
  }

  handleBlur = () => {
    const { updateListItem, completed, id } = this.props;
    const { listItem } = this.state;

    updateListItem(listItem, completed, id);
  }

  render() {
    return (
      <div className="ListItem" onBlur={this.handleBlur}>
        <input type="checkbox" id="item-input" />
        <input 
          type="text" 
          className="item-label" 
          contentEditable="true"
          onChange={this.handleChange}
          value={this.state.listItem} />
      </div>
    );
  }
}

export default ListItem;