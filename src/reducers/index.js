import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { errorReducer } from './errorReducer';

export const rootReducer = combineReducers({
  notes: notesReducer,
  isLoading: isLoadingReducer,
  error: errorReducer
});