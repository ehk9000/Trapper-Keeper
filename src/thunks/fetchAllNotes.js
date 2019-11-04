import { setLoading, addAllNotes, setError } from '../actions';

export const fetchAllNotes = () => {
  return async (dispatch) => {
    const base = 'https://trapper-keeper-api.herokuapp.com';
    const url = `${base}/api/v1/notes`;

    try {
      dispatch(setLoading(true));

      const response = await fetch(url);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const notes = await response.json();

      dispatch(setLoading(false));
      dispatch(addAllNotes(notes));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}