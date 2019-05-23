import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { fetchAddNote } from '../../thunks/fetchAddNote';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      list: [],
      listItem: '',
      id: null
    }
  }

  componentDidMount() {
    if(this.props.note) {
      const {id, title, list} = this.props.note
      this.setState({list, title, id})
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSave = async () => {
    await this.updateList();
    this.props.fetchAddNote({ title: this.state.title, list: this.state.list, id: Date.now() });
    this.setState({list:[], title: ''})
  }

  updateList = async () => {
    const newItem = this.state.listItem;
    await this.setState({
      list: [...this.state.list, { item: newItem, completed: false, id: Date.now() }],
      listItem: ''
    });
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
    let displayListItems;

    if (this.state.list.length) {
      displayListItems = this.state.list.map(listItem => itemInput)
    }

    return (
      <section className="noteForm">
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange} />
        {itemInput}
        <button onClick={this.handleSave}><i className="fas fa-plus"></i></button>
      </section>
    );
  }
}

export const mapStateToProps = ({notes}) => ({
  notes
})

export const mapDispatchToProps = dispatch => ({
  fetchAddNote: note => dispatch(fetchAddNote(note)),
  updateNote: note => dispatch(actions.updateNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  title: PropTypes.string,
  listItem: PropTypes.string,
  list: PropTypes.array
}

