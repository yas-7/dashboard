import * as types from '../actions';

const initialState ={
  authors: [],
  error: '',
  isFetching: false,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTHORS_REQUEST:
        return { ...state, isFetching: true };
    case types.AUTHORS_FAIL:
        return { ...state, isFetching: false, error: action.error }
    case types.AUTHORS_FETCHED:
      return {
        ...state,
        isFetching: false,
        authors: action.authors,
      };
    default:
      return state;
  }
}