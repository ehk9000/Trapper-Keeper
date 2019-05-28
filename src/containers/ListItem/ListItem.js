import React, { Component } from 'react';

class ListItem extends Component {
  state = {
    listItem: this.props.item,
    completed: this.props.completed
  }

  handleChange = (e) => {
    this.setState({
      listItem: e.target.value
    });
  }

  handleComplete = (e) => {
    this.setState({
      completed: !this.state.completed
    })
  }

  handleBlur = () => {
    const { updateListItem, id } = this.props;
    const { listItem, completed } = this.state;

    updateListItem(listItem, completed, id);
  }

  handleDelete = () => {
    const { deleteListItem, id } = this.props;

    deleteListItem(id);
  }

  render() {
    return (
      <div className="ListItem" onBlur={this.handleBlur}>
        <input type="checkbox" id="item-check" onChange={this.handleComplete}/>
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