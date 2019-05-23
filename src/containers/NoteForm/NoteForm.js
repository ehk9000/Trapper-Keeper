import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { fetchAddNote } from '../../thunks/fetchAddNote';
import ListItem from '../ListItem/ListItem';

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
    if (this.props.note) {
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
    const { title, list, id } = this.state;

    await this.updateList();

    if (this.state.id) {
      this.props.updateNote({ title, list, id });
    } else {
      this.props.fetchAddNote({ title, list, id: Date.now() });
    }

    this.setState({ list:[], title: '' });
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
      displayListItems = this.state.list.map(listItem => <ListItem {...listItem} />)
    }

    return (
      <section className="note-form">
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange} />
        {displayListItems}
        {itemInput}
        <button onClick={this.handleSave}><i className="fas fa-plus"></i></button>
      </section>
    );
  }
}

export const mapStateToProps = ({notes}) => ({
  notes
});

export const mapDispatchToProps = dispatch => ({
  fetchAddNote: note => dispatch(fetchAddNote(note)),
  updateNote: note => dispatch(actions.updateNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  title: PropTypes.string,
  listItem: PropTypes.string,
  list: PropTypes.array
}

