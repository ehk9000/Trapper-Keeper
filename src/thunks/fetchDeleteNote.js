import { setLoading, setError, deleteNote } from '../actions/index';

export const fetchDeleteNote = (id) => {
  return async (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    }

    const url = `http://localhost:3001/api/v1/notes/${id}`
  
  try {
    dispatch(setLoading(true))

    const response = await fetch(url, options);

    if(!response.ok) {
      throw Error(response.statusText)
    }

    dispatch(deleteNote(id));
    dispatch(setLoading(false))
    } catch(error) {
    dispatch(setError(error.message))
    }
  }
}



