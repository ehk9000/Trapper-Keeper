import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      list: [],
      listItem: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });

  }

  updateList = async () => {
    const newItem = this.state.listItem;

    await this.setState({
      list: [...this.state.list, { item: newItem, completed: false, id: Date.now() }],
      listItem: ''
    });
    this.props.addNote({ title: this.state.title, list: this.state.list, id: Date.now() });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.updateList(e);
    }
  }

  render() {
    const itemInput = 
      <input 
        type="text"
        placeholder="List item"
        name="listItem"
        value={this.state.listItem}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress} />

    return (
      <section className="noteForm">
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange} />
        {itemInput}
        <button onClick={this.updateList}><i className="fas fa-plus"></i></button>
      </section>
    );
  }
}

export const mapStateToProps = ({notes}) => ({
  notes
})

export const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(actions.addNote(note)),
  setNoteTitle: title => dispatch(actions.setNoteTitle(title))
})



export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

