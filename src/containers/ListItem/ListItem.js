import React, { Component } from 'react';

class ListItem extends Component {
  state = {
    listItem: this.props.item,
    completed: this.props.completed,
    inFocus: false
  }

  handleChange = (e) => {
    this.setState({
      listItem: e.target.value
    });
  }

  handleComplete = async () => {
    await this.setState({
      completed: !this.state.completed
    });

    this.handleBlur();
  }

  handleBlur = () => {
    const { updateListItem, id } = this.props;
    const { listItem, completed } = this.state;

    updateListItem(listItem, completed, id);

    this.setState({
      inFocus: false
    });
  }

  handleDelete = () => {
    const { deleteListItem, id } = this.props;

    deleteListItem(id);
  }

  handleFocus = () => {
    this.setState({
      inFocus: true
    });
  }

  render() {
    return (
      <div className={this.state.inFocus ? 'focused-item' : 'unfocused-item'} onBlur={this.handleBlur}>
        <input type="checkbox" id="item-check" onChange={this.handleComplete} checked={this.state.completed ? true : false} />
        <input 
          type="text" 
          className={this.state.completed ? 'item-input completed' : 'item-input'} 
          contentEditable="true"
          onChange={this.handleChange}
          value={this.state.listItem}
          onKeyPress={this.props.blurInput}
          onFocus={this.handleFocus} />
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