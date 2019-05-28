import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import { fetchDeleteNote } from '../../thunks/fetchDeleteNote';
import Note from '../../components/Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import {Link} from 'react-router-dom';

export class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    let displayNotes;
    let { notes, location} = this.props;
    let notePopup;

    if (notes.length) {  
      displayNotes = notes.map(note => 
        <Note {...note} key={note.id} fetchDeleteNote={this.props.fetchDeleteNote}/>
      );
    } else {
      displayNotes = <div className='empty-notes'>
        <i class="fas fa-edit"></i>
        <p>Notes will display here</p>
      </div>
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
        <Link to="/new-note">
          <i className="fas fa-plus add-btn"></i>      
        </Link>
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
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  fetchDeleteNote: id => dispatch(fetchDeleteNote(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
