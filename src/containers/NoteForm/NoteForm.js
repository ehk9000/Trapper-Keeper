import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    // this.props.getNotes(this.state.list)
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
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onBlur={this.updateList} />

    return (
      <section>
        <input 
          type="text" 
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange} />
        {itemInput}
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

