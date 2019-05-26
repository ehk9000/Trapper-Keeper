 import { notesReducer } from './notesReducer';
 import * as actions from '../actions';

 describe ('notesReducer', () => {

    let note = { title: 'note', listItem: 'get cream', id: 1 };
    let notes =[note, { title: 'newNote', listItem: 'get salt', id: 2 }]

    it('should return default state', () => {
      const expected = [];
      const result = notesReducer(undefined, {});

      expect(result).toEqual(expected);
    })

    describe('ADD_NOTE', () => {

      it('should add note to state tree ', () => {
        const expected = [note];
        const action = actions.addNote(note);
        const result = notesReducer([], action);

        expect(result).toEqual(expected);
      });
    });

    describe('ADD_ALL_NOTES', () => {

      it('should add all notes to state tree', () => {
        const expected = notes;
        const action = actions.addAllNotes(notes);
        const result = notesReducer([], action);
        
        expect(result).toEqual(expected);
      }); 
    });

    describe('UPDATE_NOTE', () => {

      it('should return the original matching note not found', => {
        let updateNote = { title: 'note', listItem: 'get almonds', id: 4 }
        action = actions.updateNote(updateNote)
        const expected = note
      });

      it.skip('should update note on state tree', () => {
        let updateNote = { title: 'note', listItem: 'get almonds', id: 1 };
        const action = actions.updateNote(updateNote);
        const updateNotes = [updateNote, { title: 'newNote', listItem: 'get salt', id: 2 }];
        const expected = updateNotes;
        const result = notesReducer([], action); 

        expect(result).toEqual(expected)

      });



    });

 });