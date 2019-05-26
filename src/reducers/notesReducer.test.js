 import { notesReducer } from './notesReducer';
 import * as actions from '../actions'

 describe ('notesReducer', () => {

    it('should return default state', () => {
      const expected = [];
      const result = notesReducer(undefined, {})

      expect(result).toEqual(expected)
    })
 })