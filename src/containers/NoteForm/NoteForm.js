import React, { Component } from 'react';
import  PropTypes from 'prop-types';

class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      list: []
    }
  }

  updateTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  updateList = (e) => {
    if (e.key === 'Enter') {
      const newItem = e.target.value;

      this.setState({
        list: [...this.state.list, newItem]
      });
    }
  }

  render() {
    const itemInput = 
      <input 
        type="text"
        placeholder="List item"
        onKeyPress={this.updateList} />

    return (
      <section>
        <input 
          type="text" 
          placeholder="Title"
          value={this.state.title}
          onChange={this.updateTitle} />
        {itemInput}
      </section>
    );
  }
}

export default NoteForm;

NoteForm.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

