import { fetchDeleteNote } from './fetchDeleteNote';
import * as actions from '../actions';

describe('fetchDeleteNote', () => {
  let mockNote;
  let url;
  let options;
  let mockDispatch;
  let thunk;

  beforeEach(() => {
    mockNote = {
      title: 'Title',
      list: [
        {item: 'item 1', completed: false, id: '1a'}
          ],
          id: 1
    }

    const id = mockNote.id;

    url = `http://localhost3001/api/v1/notes/${id}`;
    options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    };

    mockDispatch = jest.fn();

    thunk = fetchDeleteNote(id);

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok:true
      });
    });
  })
})