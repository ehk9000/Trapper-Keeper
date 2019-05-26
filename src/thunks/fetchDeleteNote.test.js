import { fetchDeleteNote } from './fetchDeleteNote';
import * as actions from '../actions';

describe('fetchDeleteNote', () => {
  let mockNote;
  let url;
  let options;
  let mockDispatch;
  let thunk;
  let id; 

  beforeEach(() => {
    mockNote = {
      title: 'Title',
      list: [
        {item: 'item 1', completed: false, id: '1a'}
          ],
          id: 1
    }

    id = mockNote.id

    url = `http://localhost:3001/api/v1/notes/${id}`;

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
  });

  it('should dispatch with setLoading(true)', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(true))
  });

  it('should call fetch with the correct params', async () => {
    await thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should dispatch error if response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok:false,
        statusText: 'Note not found'
      });
    });

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setError('Note not found'));
  });

  it('should dispatch deleteNote(id) with the correct params', async () => {
    mockDispatch.mockImplementation(() => id);

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.deleteNote(id));
  });

  it('should dispatch setLoading(false) if response is ok', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(false));
  });
})