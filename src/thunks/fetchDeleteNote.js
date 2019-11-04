import { setLoading, setError, deleteNote } from '../actions/';

export const fetchDeleteNote = (id) => {
  return async (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    }
    
    const base = 'https://trapper-keeper-api.herokuapp.com';
    const url = `${base}/api/v1/notes/${id}`;
  
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



