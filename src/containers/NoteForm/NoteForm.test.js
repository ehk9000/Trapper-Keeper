import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NoteForm, mapDispatchToProps, mapStateToProps} from './NoteForm';
import { fetchAddNote } from "../../thunks/fetchAddNote";
import { fetchDeleteNote } from "../../thunks/fetchDeleteNote";
import { fetchPutNote } from "../../thunks/fetchPutNote";

describe('NoteForm', () => {
  let list;
  let wrapper;
  let mockFetchPutNote = jest.fn();
  let mockFetchAddNote = jest.fn();
  let mockFetchDeleteNote = jest.fn();

  beforeEach(() => {
    list = [
      { item: 'milk', completed: false, id: 1 },
      { item: 'water', completed: true, id: 2 }
    ];
    wrapper = shallow(
      <NoteForm 
      fetchPutNote={mockFetchPutNote}
      fetchAddNote={mockFetchAddNote}
      fetchDeleteNote={mockFetchDeleteNote} />
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

  it('should update an existing list item', () => {
    wrapper.setState({ list });

    expect(wrapper.state('list')[0].item).toEqual('milk');

    wrapper.instance().updateListItem('juice', false, 1);

    expect(wrapper.state('list')[0].item).toEqual('juice');
  });

  it('should delete an existing list item', () => {
    wrapper.setState({ list });
    
    expect(wrapper.state('list').length).toEqual(2);

    wrapper.instance().deleteListItem(1);

    expect(wrapper.state('list').length).toEqual(1);
  });

  it('should invoke fetchPutNote if note already exists', async () => {
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
    wrapper.setState({ listItem: 'eggs' });

    wrapper.instance().updateList();

    expect(wrapper.state('list')[0].item).toEqual('eggs');
  });

  it('should invoke updateList on enter', () => {
    const mockEvent = { key: 'Enter' }

    wrapper.setState({
      list,
      listItem: 'juice'
    });

    wrapper.instance().handleKeyPress(mockEvent);

    expect(wrapper.state('list')[2].item).toEqual('juice');
  });

  it('should blur out of inputs on enter', () => {
    const mockEvent = {
      key: 'Enter',
      target: { blur: jest.fn() }
    }

    wrapper.instance().blurInput(mockEvent);

    expect(mockEvent.target.blur).toHaveBeenCalled();
  });

  it('should delete itself when clicking on delete icon', () => {
    wrapper.setState({
      id: 'abc123'
    }); 

    wrapper.find('.fa-trash-alt').simulate('click');

    expect(mockFetchDeleteNote).toHaveBeenCalledWith('abc123');
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
