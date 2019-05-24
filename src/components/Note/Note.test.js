import React from 'react';
import { shallow } from 'enzyme';
import Note from './Note';

describe('Note', () => {
  let wrapper;
  let mockNote = {
    title: 'Groceries',
    list:[{item:'item'}, {item: 'item'}],
    id:1234
  }

  beforeEach(() => {
    wrapper = shallow( <Note {...mockNote} key={mockNote.id}/> )
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
})