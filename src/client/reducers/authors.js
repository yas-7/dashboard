import * as types from '../actions';

const emptyAuthor = {
  isEditing: false,
  name: '',
};
const initialState = {
  authors: {},
  error: null,
  loading: false,
  currentAuthor: emptyAuthor,
};

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTHORS_REQUEST:
      return { ...state, loading: true };
    case types.AUTHORS_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.AUTHORS_FETCHED:
      return {
        ...state,
        loading: false,
        authors: action.authors.reduce(
          (acc, item) => ({ ...acc, [item.id]: item }),
          {}
        ),
      };
    case types.AUTHOR_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.AUTHOR_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: { ...state.authors, [action.author.id]: action.author },
        currentAuthor: emptyAuthor,
      };
    case types.AUTHOR_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.AUTHOR_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.AUTHOR_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredAuthors } = state.authors;
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
        error: action.error,
      };
    case types.AUTHOR_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.AUTHOR_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: { ...state.authors, [action.author.id]: action.author },
        currentAuthor: emptyAuthor,
      };
    case types.AUTHOR_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.AUTHOR_FIELDS_EDIT:
      return {
        ...state,
        currentAuthor: { ...state.currentAuthor, ...action.payload },
      };
    default:
      return state;
  }
}
