export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.note];
    case 'ADD_ALL_NOTES':
      return action.notes;
    case 'UPDATE_NOTE':
      const newState = state.map(note => {
        if (action.note.id === note.id) {
          return action.note;
        } else {
          return note;
        }
      });

      return newState;
    default: 
      return state;
  }
}