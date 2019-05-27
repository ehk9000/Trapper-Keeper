export const addAllNotes = (notes) => ({
  type: 'ADD_ALL_NOTES',
  notes
});

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

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id
});

export const setComplete = (id) => ({
  type: 'SET_COMPLETE',
  isCompleted: id
});