import React from 'react';
import { shallow } from 'enzyme';
import NoteForm from './NoteForm';

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

  it('should update list with item input', () => {
    expect(wrapper.state('listItem')).toEqual('')

    const mockEvent = { 
      key: 'Enter', 
      target: { value: 'this is a list item' }
    }

    wrapper.instance().handleKeyPress(mockEvent);

    expect(wrapper.state('list')).toEqual(['this is a list item'])
  });
});