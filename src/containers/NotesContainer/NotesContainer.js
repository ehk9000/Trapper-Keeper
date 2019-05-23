import React from 'react';
import { connect } from 'react-redux';
import Note from '../../components/Note/Note';

const NotesContainer = (props) => {
  let { notes } = props
  if(props.notes){  
    let displayNotes = notes.map(note => {
      return (
        <div>
          <Note {...note}/>
        </div>
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

const mapStateToProps = (state) => ({
  notes: state.notes
})

export default connect(mapStateToProps)(NotesContainer)