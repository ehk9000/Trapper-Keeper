import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAddNote } from '../../thunks/fetchAddNote';
import { fetchPutNote } from '../../thunks/fetchPutNote';
import { fetchDeleteNote } from '../../thunks/fetchDeleteNote'
import { Link, Redirect } from 'react-router-dom';
import ListItem from '../ListItem/ListItem';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      list: [],
      listItem: '',
      id: null,
      submitted: false
    }
  }

  componentDidMount() {
    if (this.props.note) {
      const {id, title, list} = this.props.note;
      this.setState({list, title, id});
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  updateListItem = (newItem, completed, id) => {
    const { list } = this.state;
    const newList = list.map(item => {
      if (item.id === id) return { item: newItem, completed, id };
      else return item;
    });

    this.setState({
      list: newList
    });
  }

  deleteListItem = (id) => {
    const { list } = this.state;
    const newList = list.filter(item => item.id !== id);

    this.setState({
      list: newList
    });
  }

  handleSave = async () => {
    const { title, list, id } = this.state;

    await this.updateList();

    if (this.state.id) {
      this.props.fetchPutNote({ title, list, id });
    } else {
      this.props.fetchAddNote({ title, list, id: Date.now() });
    }

    this.setState({ list:[], title: '', submitted: true});
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

  blurInput = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  handleDelete = () => {
   const { id } = this.state;

   this.props.fetchDeleteNote(id);
  }

  renderRedirect = () => {
    console.log('hello')
    if(this.state.submitted) {
    return <Redirect to="/" />
    }
  }


  render() {
    const itemInput = 
      <input 
        type="text"
        placeholder="Add list item"
        name="listItem"
        value={this.state.listItem}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress} />
    let displayListItems;

    if (this.state.list.length) {
      displayListItems = this.state.list.map(listItem => 
        <ListItem 
          {...listItem} 
          updateListItem={this.updateListItem}
          deleteListItem={this.deleteListItem}
          blurInput={this.blurInput}
          key={listItem.id} />
      );
    }

    return (
      <div className="note-form-bg">
        {this.renderRedirect()}
        <section className="note-form" onBlur={this.handleSave}>
          <input 
            type="text" 
            className="note-title"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            onKeyPress={this.blurInput} />
          {displayListItems}
          {itemInput}
          <Link to="/">
            <i className="far fa-trash-alt" onClick={this.handleDelete} ></i>
            <button onClick={this.handleSave}>Save</button>
          </Link>
        </section>
      </div>
    );
  }
}

export const mapStateToProps = ({notes}) => ({
  notes
});

export const mapDispatchToProps = dispatch => ({
  fetchAddNote: note => dispatch(fetchAddNote(note)),
  fetchDeleteNote: id => dispatch(fetchDeleteNote(id)),
  fetchPutNote: note => dispatch(fetchPutNote(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  title: PropTypes.string,
  listItem: PropTypes.string,
  list: PropTypes.array,
  id: PropTypes.number,
  submitted: PropTypes.bool
}
