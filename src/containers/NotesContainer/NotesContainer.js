import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import Note from '../../components/Note/Note';
import NoteForm from '../NoteForm/NoteForm';

export class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    let displayNotes;
    let { notes, location} = this.props;
    let notePopup;

    if (notes) {  
      displayNotes = notes.map(note => 
        <Note {...note} key={note.id}/>
      );
    } else {
      displayNotes = <h3>Add Notes Here</h3>
    }

    if (location.pathname === "/new-note" ) {
      notePopup = 
        <div className="popup-background">
          <NoteForm />
        </div>
    } 

    if (location.pathname.includes('/notes/')) {
      const id = location.pathname.split("/")[2]
      const match = notes.find(note => {
        return note.id === parseInt(id);
      });

      if (match !== undefined) {
        notePopup = 
        <div className="popup-background">
          <NoteForm note={match} />
        </div>
      }
    }

    return (
      <div className="main-container">
        <section className="notes-container">
          {displayNotes}
        </section>
        {notePopup}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
});

export const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
