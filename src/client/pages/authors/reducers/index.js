import * as types from '../actions';

const emptyAuthor = {
  isEditing: false,
  name: '',
};
const initialState = {
  authors: { allIds: [], byId: {} },
  error: null,
  loading: false,
  currentAuthor: emptyAuthor,
  isPopupActive: false,
  notification: null,
};

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTHORS_REQUEST:
    case types.AUTHOR_ADD_REQUEST:
    case types.AUTHOR_DELETE_REQUEST:
    case types.AUTHOR_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.AUTHORS_FAIL:
    case types.AUTHOR_ADD_FAIL:
    case types.AUTHOR_DELETE_FAIL:
    case types.AUTHOR_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.AUTHORS_FETCHED:
      return {
        ...state,
        loading: false,
        authors: action.authors.reduce(
          (acc, author) => ({
            byId: {
              ...acc.byId,
              [author.id]: author,
            },
            allIds: [ ...acc.allIds, author.id ],
          }),
          { allIds: [], byId: {} }
        ),
      };
    case types.AUTHOR_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: {
          byId: {
            ...state.authors.byId,
            [action.author.id]: action.author,
          },
          allIds: [ ...state.authors.allIds, action.author.id ],
        },
        currentAuthor: emptyAuthor,
        isPopupActive: false,
      };
    case types.AUTHOR_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredAuthors } = state.authors.byId;
      return {
        ...state,
        loading: false,
        error: null,
        authors: {
          byId: filteredAuthors,
          allIds: state.authors.allIds.filter((id) => id !== action.id),
        },
      };
    case types.AUTHOR_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authors: {
          ...state.authors,
          byId: { ...state.authors.byId, [action.author.id]: action.author },
        },
        currentAuthor: emptyAuthor,
        isPopupActive: false,
      };
    case types.AUTHOR_FIELDS_EDIT:
      return {
        ...state,
        currentAuthor: { ...state.currentAuthor, ...action.payload },
        isPopupActive: true,
      };
    case types.AUTHOR_CANCEL_EDIT:
      return {
        ...state,
        currentAuthor: emptyAuthor,
        isPopupActive: false,
      };
    case types.AUTHOR_HIDE_MESSAGE:
      return {
        ...state,
        notification: null,
        loading: false,
      };
    case types.AUTHOR_SHOW_MESSAGE:
      return {
        ...state,
        notification: action.message,
        loading: false,
      };
    default:
      return state;
  }
}
