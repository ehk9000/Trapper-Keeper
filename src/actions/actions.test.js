import * as actions from './index'

describe('actions', () => {
  it('should return a type of addAllNotes with a notes array', () => {
    const notes = [
      {
      title: 'Groceries',
      list: [{
        item: 'milk', completed: false, id:3493}], 
      id:1234 },
    {
      title: 'Todo',
      list: [{
        item: 'eggs', completed: false, id: 12355
      }],
      id:234239
    }
  ];

  const expected  = {
    type: 'ADD_ALL_NOTES',
    notes
  }

  const result = actions.addAllNotes(notes)

  expect(result).toEqual(expected)
  });
  
  it('should return a type of setLoading with a boolean', () => {
    const bool = true;
    const expected = {
      type: 'SET_LOADING',
      isLoading: bool
    }

    const result = actions.setLoading(bool);

    expect(result).toEqual(expected);
  });

  it('should return a type of addNote with a new note', () => {
    const note = {
      title: 'Chores',
        list: [{
          item: 'laundry', completed: false, id: 32343
        }],
          id: 1444
    }

    const expected = {
      type:'ADD_NOTE',
      note
    }

    const result = actions.addNote(note);

    expect(result).toEqual(expected);
  });

  it('should return a type of updateNote with a new note', () => {
    const note = {
      title: 'Chores',
      list: [{
        item: 'laundry', completed: false, id: 32343
      }],
      id: 1444
    };

    const expected = {
      type: 'UPDATE_NOTE',
      note
    };

    const result = actions.updateNote(note);

    expect(result).toEqual(expected);
  });

  it('should return a type of setError with an error message', () => {
    const error = 'Something went wrong';
    const expected = {
      type: 'SET_ERROR',
      error
    };

    const result = actions.setError(error);

    expect(result).toEqual(expected);
  });

  it('should return a type of deleteNote with an id', () => {
    const id = 3;

    const expected = {
      type: 'DELETE_NOTE',
      id
    };

    const result = actions.deleteNote(id);

    expect(result).toEqual(expected);
  });

  it('should return a type of setCompleted with an id', () => {
    const id = 5;

    const expected = {
      type: 'SET_COMPLETE',
      isCompleted: id
    };

    const result = actions.setComplete(id);

    expect(result).toEqual(expected);
  });
});