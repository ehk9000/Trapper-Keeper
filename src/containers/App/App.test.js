import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
     wrapper = shallow( <App/> )
  })

  it('Should render correctly ', () => {
    expect(wrapper).toMatchSnapshot()
  })
})