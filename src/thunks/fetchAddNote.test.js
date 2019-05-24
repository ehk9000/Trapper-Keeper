import { fetchAddNote } from './fetchAddNote';
import * as actions from '../actions';

describe('fetchAddNote', () => {
  let mockNote;
  let url;
  let options;
  let thunk;
  let mockDispatch;

  beforeEach(() => {
    mockNote = {
      title: 'Title',
      list: [
        {item: 'item 1', completed: false, id: '1a'}
      ],
      id: 1
    }
    url = 'http://localhost:3001/api/v1/notes';
    options =  {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({})
    }
    thunk = fetchAddNote(url);
    mockDispatch = jest.fn();
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNote)
      });
    });
  });

  it('should call dispatch with setLoading(true)', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(true));
  });

  it('should call fetch with the correct params', async () => {
    await thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(url, options)
  });

  it('should dispatch error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      });
    });

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setError('Something went wrong'));
  });

  it('should dispatch setLoading(false) if response is ok', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(false));
  });

  it('should dispatch addNote with the correct params', async () => {
    mockDispatch.mockImplementation(() => mockNote);

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.addNote(mockNote));
  });
});