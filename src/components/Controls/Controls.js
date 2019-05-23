import React from 'react';
import {Route} from 'react-router-dom';
import NotesContainer from '../../containers/NotesContainer/NotesContainer'

export const Controls = () => {
  return (
    <section>
      <Route exact path="/" component={NotesContainer} />
      <Route exact path="/new-note" component={NotesContainer} />
      <Route exact path="/notes/:id" component={NotesContainer} />
    </section>

  )

}

export default Controls;