import { fetchPutNote } from './fetchPutNote'
import * as actions from '../actions'

describe('fetchPutNote', () => {
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
      
      url = `http://localhost:3001/api/v1/notes/${id}`;
      
      options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(mockNote)
      };

      mockDispatch = jest.fn();

      thunk = fetchPutNote(mockNote);

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:true
        });
      });
    });

    it('should dispatch with setLoading(true)', async () => {
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(true));
    });

    it('should call fetch with the correct params', async () => {
      await thunk(mockDispatch);

      expect(window.fetch).toHaveBeenCalledWith(url, options)
    });

    it('should dispatch error if response is not okay', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:false,
          statusText: 'Note not found'
        });
      });

      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(actions.setError('Note not found'))
    });

    it('should dispatch updateNote(body) with the correct params', async () => {
      mockDispatch.mockImplementation(() => mockNote);

      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(actions.updateNote(mockNote));
    });

    it('should dispatch setLoading(false) if response is ok', async () => {
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(actions.setLoading(false));
    })
});