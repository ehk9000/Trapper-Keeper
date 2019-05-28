import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAddNote } from '../../thunks/fetchAddNote';
import { fetchPutNote } from '../../thunks/fetchPutNote';
import { fetchDeleteNote } from '../../thunks/fetchDeleteNote'
import { Link } from 'react-router-dom';
import ListItem from '../ListItem/ListItem';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      list: [],
      listItem: '',
      id: null,
      inFocus: false
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

    this.setState({ list:[], title: '', submitted: true });
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

  focusInput = () => {
    console.log('focus')
    this.setState({
      inFocus: true
    });
  }

  blurInput = () => {
    console.log('blur')
    this.setState({
      inFocus: false
    });
  }

  render() {
    let incompletedList;
    let incompletedListItems;
    let completedList;
    let completedListItems;

    if (this.state.list.length) {
      incompletedList = this.state.list.filter(item => !item.completed);

      incompletedListItems = incompletedList.map(item => 
        <ListItem 
          {...item} 
          updateListItem={this.updateListItem}
          deleteListItem={this.deleteListItem}
          blurInput={this.blurInput}
          key={item.id} /> );

      completedList = this.state.list.filter(item => item.completed);

      completedListItems = completedList.map(item => 
        <ListItem 
          {...item} 
          updateListItem={this.updateListItem}
          deleteListItem={this.deleteListItem}
          blurInput={this.blurInput}
          key={item.id} /> );
    }

    return (
      <div className="note-form-bg">
        <section className="note-form">
          <input 
            type="text" 
            className="note-title"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            onKeyPress={this.blurInput} />
          <div className="list-items-wrapper">
            {incompletedListItems}
            <div className={this.state.inFocus
                  ? 'focused-item new-item-input'
                  : 'unfocused-item new-item-input'}>
              <i class="fas fa-plus"></i>
              <input 
                type="text"
                placeholder="Add list item"
                name="listItem"
                value={this.state.listItem}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onFocus={this.focusInput}
                onBlur={this.blurInput} />
            </div>
            <hr />
            {completedListItems}
            <div className="form-btn-wrapper">
              <Link to="/">
                <i className="far fa-trash-alt" onClick={this.handleDelete}></i>
              </Link>
              <Link to="/">
                <button className="save-btn" onClick={this.handleSave}>Save</button>
              </Link>
            </div>
          </div>
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
