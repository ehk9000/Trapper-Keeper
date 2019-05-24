import React from 'react';
import { shallow } from 'enzyme';
import Controls from './Controls'

describe('Controls', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <Controls/> )
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
})