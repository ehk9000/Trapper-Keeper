import React from 'react'
import NotesContainer from './NotesContainer'
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import { shallow } from 'enzyme'

jest.mock('../../thunks/fetchAllNotes')

describe('NotesContainer', () => {

  it('should match snapshot', () => {
   expect(NotesContainer).toMatchSnapshot();
  })

  describe('componentDidMount', () => {

    fetchAllNotes.mockImplementation(() => {})

    it('should call fetchAllNotes', () => {
     expect(fetchAllNotes).toHaveBeenCalled()
    })

  })

  describe('Render', () => {

    it('should return displayNotes', () => {

    })

    it('should return notePopup', () => {

    })

  })

  describe('mapStateToProps', () => {

    it('should map state to props', () => {

    })

  })

  describe('mapDispatchToProps', () => {

    it('should map dispatch to props', () => {

    })
    
  })

})