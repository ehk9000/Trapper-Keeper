import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import Note from '../../components/Note/Note';

class NotesContainer extends Component {

  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    let displayNotes;
    let { notes } = this.props
    let notePopup;

    if (notes) {  
      displayNotes = notes.map(note => 
        <Note {...note} key={note.id}/>
      )
    } else {
      displayNotes = <h3>Add Notes Here</h3>
    }

    if (this.props.location.pathname === "/new-note") {
      console.log('newNote')
    }

    return (
      <section>
        {displayNotes}
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
