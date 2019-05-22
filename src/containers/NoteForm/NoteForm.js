import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNotes } from '../../actions/index';

class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItem: '',
      list: []
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });
  }

  updateList = (e) => {
    const newItem = e.target.value;

    this.setState({
      listItem: '',
      list: [...this.state.list, newItem]
    });
    this.props.getNotes(this.state.list)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.updateList(e);
    }
  }

  onClick = () => {
    this.setState({
      title: '',
      listItem: ''
    })
  }

  render() {
    const itemInput = 
      <input 
        type="text"
        placeholder="List item"
        name="listItem"
        value={this.state.listItem}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onBlur={this.updateList} />

    return (
      <section className="noteForm">
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange} />
        {itemInput}
        <button onClick={this.onClick}><i className="fas fa-plus"></i></button>
      </section>
    );
  }
}

export const mapStateToProps = ({notes}) => ({
  notes
})

export const mapDispatchToProps = dispatch => ({
  getNotes: list => dispatch(getNotes(list))
})



export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

