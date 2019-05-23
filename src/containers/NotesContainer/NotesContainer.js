import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import Note from '../../components/Note/Note';
import NoteForm from '../NoteForm/NoteForm'

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

    if (this.props.location.pathname === "/new-note" ) {
      notePopup = 
      <div className="popup-background">
        <NoteForm />
      </div>
    } 

    if(this.props.location.pathname.includes('/notes/')) {
      const id = this.props.location.pathname.split("/")[2]
      const match = this.props.notes.find(note => {
        if (note.id == id) {
          return note 
        }
      })
      if (match !== undefined) {
        notePopup = 
        <div className="popup-background">
          <NoteForm note={match} />
        </div>
      }
    }

    return (
      <section>
        {displayNotes}
        {notePopup}
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
