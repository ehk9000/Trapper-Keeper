import * as actions from './index'

describe('actions', () => {
  it('should return a type of GET_NOTES with a notes array', () => {
    const notes = [
      {
      title: 'Groceries',
      listItem: 'blah blah'}, 
    {
      title: 'Todo',
      listItem: 'blah'
    }
  ]
  const expected  = {
    type: 'GET_NOTES',
    notes
  }

  const result = actions.getNotes(notes)

  expect(result).toEqual(expected)

  })
})