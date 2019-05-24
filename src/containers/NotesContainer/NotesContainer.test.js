import React from 'react'
import {NotesContainer, mapStateToProps, mapDispatchToProps} from './NotesContainer'
import { fetchAllNotes } from '../../thunks/fetchAllNotes';
import { shallow } from 'enzyme';
import NoteForm from '../NoteForm/NoteForm'

const mockLocation = { pathname: '/new-note' }

const mockNotes = [{title: 'newNote', list:[]}]

jest.mock('../../thunks/fetchAllNotes')
jest.mock('../NoteForm/NoteForm')

describe('NotesContainer', () => {
  const wrapper = shallow(<NotesContainer 
                            fetchAllNotes={fetchAllNotes} 
                            notes={mockNotes} 
                            location={mockLocation}/>)

  it('should match snapshot', () => {
   expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {

    fetchAllNotes.mockImplementation(() => {})

    it('should call fetchAllNotes', () => {
     expect(fetchAllNotes).toHaveBeenCalled()
    })

  })

  describe('Render', () => {

    it('should match snapshot if notes are present', () => {
      let notes = mockNotes 
      expect(NotesContainer).toMatchSnapshot()
    })

    it('should match snapshot if no notes are present', () => {
     let notes = []
     expect(NotesContainer).toMatchSnapshot()

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