import { setLoading, addAllNotes, setError } from '../actions';

export const fetchAllNotes = () => {
  return async (dispatch) => {
    const url = 'http://localhost:3001/api/v1/notes';

    try {
      dispatch(setLoading(true));

      const response = await fetch(url);

      if(!response.ok) {
        throw Error(response.statusText);
      }

      const notes = await response.json();

      dispatch(addAllNotes(notes));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}