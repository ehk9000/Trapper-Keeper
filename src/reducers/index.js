import { combineReducers } from 'redux';
import { noteListReducer } from './noteReducer'

export const rootReducer = combineReducers({
  notes: noteListReducer
});