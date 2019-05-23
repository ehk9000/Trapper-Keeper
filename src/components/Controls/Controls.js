import React from 'react';
import {Route} from 'react-router-dom';
import NoteForm from '../../containers/NoteForm/NoteForm'
import NoteDetails from '../NoteDetails/NoteDetails'

export const Controls = () => {
  return (
    <section>

      {/* <Route exact path="/" Component={NoteContainer} /> */}
      <Route exact path="/new-note" Component={NoteForm} />
      <Route exact path="/notes/:id" Component={NoteDetails} />
    </section>

  )

}

export default Controls;