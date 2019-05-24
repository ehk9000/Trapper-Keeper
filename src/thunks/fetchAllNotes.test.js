import { fetchAllNotes } from './fetchAllNotes';
import * as actions from '../actions';

describe('fetchAllNotes', () => {
  let mockNotes;
  let url;
  let mockDispatch;
  let thunk;

  beforeEach(() => {
    mockNotes = [
      {
        title: 'Title',
        list: [
          {item: 'item 1', completed: false, id: '1a'}
        ],
        id: 1
      }
    ]
    url = 'http://localhost:3001/api/v1/notes';
    mockDispatch = jest.fn();
    thunk = fetchAllNotes(url);

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNotes)
      });
    });
  });
  
  it('should dispatch setLoading(true)', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(true));
  });

  it('should call fetch with the correct params', async () => {
    await thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(url);
  });

  it('should return an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      });
    });

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setError('Something went wrong'));
  });

  it('should dispatch setLoading(false)', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(false));
  });

  it('should dispatch addAllNotes with the correct params', async () => {
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.addAllNotes(mockNotes));
  });
});