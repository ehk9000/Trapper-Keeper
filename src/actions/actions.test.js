import * as actions from './index'

describe('actions', () => {
  it('should return a type of GET_NOTES with a notes array', () => {
    const note = [
      {
      title: 'Groceries',
      listItem: 'blah blah'}, 
    {
      title: 'Todo',
      listItem: 'blah'
    }
  ]
  const expected  = {
    type: 'ADD_NOTE',
    note
  }

  const result = actions.addNote(note)

  expect(result).toEqual(expected)

  })
})