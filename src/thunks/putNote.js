import { setError, updateNote, setLoading } from '../actions'

export const putNote = (note) => {
  return async (dispatch) => {
    const id = note.id
    const body = {
      title: note.title,
      list: note.list,
      id: note.id
    }
    const options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    }
    const url = `http://localhost:3001/api/v1/notes/${id}`
  
    try {
    dispatch(setLoading(true))
    dispatch(updateNote(body));

    const response = await fetch(url, options);

    if (!response.ok) {
      throw Error(response.statusText)
    }
    
    dispatch(setLoading(false))

    const status = await response.json();
    console.log('status',status)


    } catch(error){
      dispatch(setError(error.message))
    }
  }
}