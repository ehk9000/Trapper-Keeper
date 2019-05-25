export const addAllNotes = (notes) => ({
  type: 'ADD_ALL_NOTES',
  notes
});deleteNote

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const updateNote = (note) => ({
  type: 'UPDATE_NOTE',
  note
});

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  isLoading: bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});

export const  = (id) => ({
  type: 'DELETE_NOTE',
  id
})