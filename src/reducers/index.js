import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer';
import { isLoadingReducer } from './isLoadingReducer';

export const rootReducer = combineReducers({
  notes: notesReducer,
  isLoading: isLoadingReducer
});