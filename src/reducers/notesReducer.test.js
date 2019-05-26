 import { notesReducer } from './notesReducer';
 import * as actions from '../actions';

 describe ('notesReducer', () => {

    let note = { title: 'newNote', listItem: 'get peas' }

    it('should return default state', () => {
      const expected = [];
      const result = notesReducer(undefined, {});

      expect(result).toEqual(expected);
    })

    it('should add note to state tree ',() => {
      const expected = [note];
      const action = actions.addNote(note);
      const result = notesReducer([], action)

      expect(result).toEqual(expected)
    });
 })