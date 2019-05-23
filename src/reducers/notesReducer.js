export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.note];
    case 'ADD_ALL_NOTES':
      return action.notes;
    case 'UPDATE_NOTE':
      return [...state, action.note];
    default: 
    return state;
  }
}