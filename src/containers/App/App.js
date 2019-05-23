import React from 'react';
import NoteForm from '../NoteForm/NoteForm';
import NotesContainer from '../NotesContainer/NotesContainer'


function App() {
  return (
    <div className="App">
      <header>
        <h1>
          <i className="fas fa-edit"></i>
          Trapper Keeper
        </h1>
        <NoteForm />
        <NotesContainer />
      </header>
    </div>
  );
}

export default App;
