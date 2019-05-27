import React, { Component } from 'react';

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

  handleDelete = () => {
    const { deleteListItem, id } = this.props;

    deleteListItem(id);
  }

  render() {
    return (
      <div className="ListItem" onBlur={this.handleBlur}>
        <input type="checkbox" id="item-check" />
        <input 
          type="text" 
          className="item-input" 
          contentEditable="true"
          onChange={this.handleChange}
          value={this.state.listItem}
          onKeyPress={this.props.blurInput} />
        <button 
          className="delete-item-btn"
          onClick={this.handleDelete}>
          <span className="delete-x">X</span>
        </button>
      </div>
    );
  }
}

export default ListItem;