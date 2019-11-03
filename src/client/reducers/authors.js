import * as types from '../actions';

const emptyAuthor ={
  isEditing: false,
  name: '',
}
const initialState = {
  authors: {},
  error: null,
  loading: false,
  currentAuthor: emptyAuthor,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTHORS_REQUEST:
      return { ...state, loading: true };
    case types.AUTHORS_FAIL:
      return { ...state, loading: false, error: action.error }
    case types.AUTHORS_FETCHED:
      const authors = action.authors.reduce((acc, item) => ({...acc,[item.id]: item}) ,{});
      return {
        ...state,
        loading: false,
        authors,
      };
    case types.AUTHOR_ADD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.AUTHOR_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: {...state.authors, [action.author.id]: action.author}
      };
    case types.AUTHOR_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.AUTHOR_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.AUTHOR_DELETE_SUCCESS:
        const { [action.id]: omit, ...filteredAuthors} = state.authors;
      return {
        ...state,
        loading: false,
        error: null,
        authors: filteredAuthors,
      };
    case types.AUTHOR_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.AUTHOR_EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.AUTHOR_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: {...state.authors, [action.author.id]: action.author},
        currentAuthor: emptyAuthor
      };
    case types.AUTHOR_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.AUTHOR_FIELDS_START_EDIT:
      return {
        ...state,
        currentAuthor: { ...state.currentAuthor, isEditing: true, ...action.author },
    }
    case types.AUTHOR_FIELDS_EDIT:
      return {
        ...state,
        currentAuthor: { ...state.currentAuthor, ...action.data },
    }
    default:
      return state;
  }
}