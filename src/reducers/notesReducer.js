export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, action.note];
    default: 
    return state;
  }
}