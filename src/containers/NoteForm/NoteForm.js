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

  handleChange = (e) => {
    const { name, value } = e;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <section>
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          onChange={this.handleChange} />
      </section>
    );
  }
}

export default NoteForm;

NoteForm.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

