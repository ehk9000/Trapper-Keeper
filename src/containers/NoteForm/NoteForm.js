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
  render() {
    return (
      <section>

      </section>
    )
  }
}

export default NoteForm;

NoteForm.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

