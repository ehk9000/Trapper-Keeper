import React, { Component } from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
  let mockListItem;
  let mockUpdateListItem;
  let mockDeleteListItem;
  let mockBlurInput;
  let wrapper;

  beforeEach(() => {
    mockListItem = { item: 'milk', completed: false, id:111111 };
    mockUpdateListItem = jest.fn();
    mockDeleteListItem = jest.fn();
    mockBlurInput = jest.fn();
    wrapper = shallow(
      <ListItem 
        {...mockListItem} 
        updateListItem={mockUpdateListItem}
        deleteListItem={mockDeleteListItem}
        blurInput={mockBlurInput}
        key={mockListItem.id} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with item input', () => {
    expect(wrapper.state('listItem')).toEqual('milk');

    let mockEvent = { target: { value: 'juice' } };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('listItem')).toEqual('juice');
  });

  it('should invoke updateListItem with the correct params on blur', () => {
    let mockEvent = { target: { value: 'juice' } };

    wrapper.instance().handleChange(mockEvent);

    wrapper.instance().handleBlur();

    expect(mockUpdateListItem).toHaveBeenCalledWith('juice', false, 111111)
  });

  it('should invoke deleteListItem with the correct params when delete button is clicked', () => {
    wrapper.find('.delete-item-btn').simulate('click');

    expect(mockDeleteListItem).toHaveBeenCalledWith(mockListItem.id);
  });
});
