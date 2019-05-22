export const noteListReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return action.notes
    default: 
    return state
  }
}