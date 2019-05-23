import React from 'react';
import NoteForm from '../NoteForm/NoteForm';
import NotesContainer from '../NotesContainer/NotesContainer';
import Controls from '../../components/Controls/Controls'
import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          <i className="fas fa-edit"></i>
          Trapper Keeper
        </h1>
        <Controls/>
      </header>
    </div>
  );
}

export default App;
