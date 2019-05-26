import { errorReducer } from './errorReducer';
import * as actions from '../actions';

describe ('errorReducer', () => {

  it('should return default state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
   
    expect(result).toEqual(expected);
  });

  it('should set an error in the state tree', () => {
    const error = 'error';
    const action = actions.setError(error);
    const expected = 'error';
    const result = errorReducer('',action );

    expect(result).toEqual(expected);
  });
});