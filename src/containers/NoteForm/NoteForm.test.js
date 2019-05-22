import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NoteForm, mapDispatchToProps, mapStateToProps} from './NoteForm';

describe('NoteForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <NoteForm />)
  })

  describe('mapStateToProps', () => {
    it('should return a props object with the notes array', () => {
      const mockNotes = {
        notes: [{
          title: 'groceries',
          list:[{item: 'milk', id: 122523453}, {item: 'eggs', id:12312321}]
          }]
    }

      const expected = {
        notes: mockNotes.notes
      }

      const mappedProps = mapStateToProps(mockNotes)

      expect(mappedProps).toEqual(expected)

    })
  })
})