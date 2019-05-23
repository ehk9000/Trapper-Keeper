import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import Note from '../../components/Note/Note';

class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  render() {
    let { notes } = props
    if(notes) {  
      let displayNotes = notes.map(note => {
        return (
            <Note {...note}/>
        )
      })
      return(
        <div>
          {displayNotes}
        </div>
      )
    } else {
      return(
        <div>
          display Notes here
        </div>
      )
    }
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
});

export const mapDispatchToProps = dispatch => ({
  fetchAllNotes: () => dispatch(fetchAllNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
