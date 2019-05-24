import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NoteForm, mapDispatchToProps, mapStateToProps} from './NoteForm';
import * as actions from '../../actions'

describe('NoteForm', () => {
  let wrapper;
  let mockFetchPutNote = jest.fn();
  let mockFetchAddNote = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NoteForm 
      fetchPutNote={mockFetchPutNote}
        fetchAddNote={mockFetchAddNote} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      title: '',
      list: [],
      listItem: '',
      id: null,
      submitted: false
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

  it('should invoke putNote if note already exists', async () => {
    wrapper.setState({
      id: 1111
    });

    await wrapper.instance().handleSave();

    expect(mockFetchPutNote).toHaveBeenCalled();
  });

  it('should invoke fetchAddNote if note is new', async () => {
    expect(wrapper.state('id')).toEqual(null);

    await wrapper.instance().handleSave();

    expect(mockFetchAddNote).toHaveBeenCalled();
  });

  it('should update list with item input', () => {
    wrapper.setState({ listItem: 'milk' });

    wrapper.instance().updateList();

    expect(wrapper.state('list')[0].item).toEqual('milk');
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
    it.skip('should call a dispatch when using a function from MDTP', () => {
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
