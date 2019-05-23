import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';

class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    const titles = this.props.notes.map(note => 
      <h2>{note.title}</h2>
    )

    return(
      <section>
        {titles}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
});

export const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);