import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NoteForm, mapDispatchToProps, mapStateToProps} from './NoteForm';
import { fetchAddNote } from "../../thunks/fetchAddNote";
import { fetchDeleteNote } from "../../thunks/fetchDeleteNote";
import { fetchPutNote } from "../../thunks/fetchPutNote";

describe('NoteForm', () => {
  let wrapper;
  let mockFetchPutNote = jest.fn();
  let mockFetchAddNote = jest.fn();
  let mockfetchDeleteNote = jest.fn();
    
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

  it('should delete an item', () => {
    const list = [{ listItem: 'milk', completed: false, id:1 },
                  { listItem: 'water', completed: true, id:2 }];

    wrapper.setState({ list });

    wrapper.instance().deleteListItem(1);
  
    const expected = [{ listItem: 'water', completed: true, id:2 }];

    expect(wrapper.state('list')).toEqual(expected);

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

    beforeEach(() => {
    wrapper = shallow(
      <NoteForm 
      fetchPutNote={mockFetchPutNote}
      fetchAddNote={mockFetchAddNote}
      fetchDeleteNote={mockfetchDeleteNote} />
      );
    });

    it.skip('should dispatch fetchAddNotes to props', () => {
      const mockDispatch = jest.fn();

      fetchAddNote.mockImplementation(() => {});

      const dispatchReturned = mapDispatchToProps(mockDispatch);
      const expected = { fetchAddNotes: (expect.any(Function)) };

      expect(dispatchReturned).toEqual(expected);
    });

  });
});
