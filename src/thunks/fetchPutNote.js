import { setError, updateNote, setLoading } from '../actions';

export const fetchPutNote = (note) => {
  return async (dispatch) => {
    const id = note.id;

    const body = {
      title: note.title,
      list: note.list,
      id: note.id,
      background: note.background
    }

    const options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    }

    const base = 'https://trapper-keeper-api.herokuapp.com';
    const url = `${base}/api/v1/notes/${id}`;

    try {
      dispatch(setLoading(true));

      const response = await fetch(url, options);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(updateNote(body));
      dispatch(setLoading(false));
    } catch(error) {
      dispatch(setError(error.message));
    }
  }
}