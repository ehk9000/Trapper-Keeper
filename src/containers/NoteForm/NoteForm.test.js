import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NoteForm, mapDispatchToProps, mapStateToProps} from './NoteForm';
import * as actions from '../../actions'

const addNote = jest.fn();
const setNoteTitle = jest.fn();

describe('NoteForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NoteForm />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      title: '',
      listItem: '',
      list: []
    });
  });

  it('should update title or list item with keypress', () => {
    expect(wrapper.state('title')).toEqual('');

    const mockEvent = {
      target: { name: 'title', value: 'this is a title' }
    }

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('title')).toEqual('this is a title');
  });

  it.skip('should update list with item input', async () => {
    expect(wrapper.state('listItem')).toEqual('')

    const mockEvent = { 
      key: 'Enter', 
      target: { value: 'this is a list item' }
    }

    wrapper.instance().handleKeyPress(mockEvent);
    wrapper.instance().updateList();

    expect(wrapper.state('list.item')).toEqual('this is a list item')
  });

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
  describe('mapDispatchToProps', () => {
    it('should call a dispatch when using a function from MDTP', () => {
      const mockDispatch = jest.fn();
      const mockNotes = {
        notes: [{
          title: 'groceries',
          list:[{item: 'milk', id: 122523453}, {item: 'eggs', id:12312321}]
          }]
        }

      const actionToDispatch = actions.addNote(mockNotes)

      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.addNote(mockNotes)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it.skip('should call a dispatch when using a function from MDTP', () => {
      const mockDispatch = jest.fn();

      const mockNotes = {
        notes: [{
          title: 'groceries',
          list:[{item: 'milk', id: 122523453}, {item: 'eggs', id:12312321}]
          }]
        }
      const actionToDispatch = actions.setNoteTitle(mockNotes)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addNote(mockNotes)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
});
