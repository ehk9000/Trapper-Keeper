export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const updateNote = (note) => ({
  type: 'UPDATE_NOTE',
  note
});

// export const setNoteTitle = (title) => ({
//   type: 'SET_NOTE_TITLE',
//   title
// });

// export const setListItem = (item) => ({
//   type: 'SET_LIST_ITEM',
//   item
// });

// export const toggleComplete = (bool) => ({
//   type: 'TOGGLE_COMPLETE',
//   complete: bool
// });

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  isLoading: bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});