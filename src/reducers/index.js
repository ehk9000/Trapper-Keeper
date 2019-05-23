import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer'

export const rootReducer = combineReducers({
  notes: notesReducer,
  // isLoading: isLoadingReducer
});