import * as types from '../actions';

const emptyWebsite = {
  isEditing: false,
  name: '',
};
const initialState = {
  websites: { allIds: [], byId: {} },
  error: null,
  loading: false,
  currentWebsite: emptyWebsite,
  isPopupActive: false,
  notification: null,
  filter: { searchBy: 'name', searchValue: '' },
  order: { orderBy: 'name', direction: 'asc' },
  pagination: {
    limit: 2,
    offset: 0,
    count: 0,
  },
};

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.WEBSITES_REQUEST:
    case types.WEBSITE_ADD_REQUEST:
    case types.WEBSITE_DELETE_REQUEST:
    case types.WEBSITE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.WEBSITES_FAIL:
    case types.WEBSITE_ADD_FAIL:
    case types.WEBSITE_DELETE_FAIL:
    case types.WEBSITE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.WEBSITES_FETCHED:
      return {
        ...state,
        loading: false,
        websites: action.websites.reduce(
          (acc, website) => ({
            byId: {
              ...acc.byId,
              [website.id]: website,
            },
            allIds: [ ...acc.allIds, website.id ],
          }),
          { allIds: [], byId: {} }
        ),
      };
    case types.WEBSITE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        websites: {
          byId: {
            ...state.websites.byId,
            [action.website.id]: action.website,
          },
          allIds: [ ...state.websites.allIds, action.website.id ],
        },
        currentWebsite: emptyWebsite,
        isPopupActive: false,
      };
    case types.WEBSITE_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredWebsites } = state.websites.byId;
      return {
        ...state,
        loading: false,
        error: null,
        websites: {
          ...state.websites,
          byId: filteredWebsites,
          allIds: state.websites.allIds.filter((id) => id !== action.id),
        },
      };
    case types.WEBSITE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        websites: {
          ...state.websites,
          byId: { ...state.websites.byId, [action.website.id]: action.website },
        },
        currentWebsite: emptyWebsite,
        isPopupActive: false,
      };
    case types.WEBSITE_FIELDS_EDIT:
      return {
        ...state,
        currentWebsite: { ...state.currentWebsite, ...action.payload },
        isPopupActive: true,
      };
    case types.WEBSITE_CANCEL_EDIT:
      return {
        ...state,
        currentWebsite: emptyWebsite,
        isPopupActive: false,
      };
    case types.WEBSITE_HIDE_MESSAGE:
      return {
        ...state,
        notification: null,
        loading: false,
      };
    case types.WEBSITE_SHOW_MESSAGE:
      return {
        ...state,
        notification: action.message,
        loading: false,
      };
    case types.WEBSITE_CHANGE_ORDER:
      return {
        ...state,
        order: { ...state.order, ...action.order },
      };
    case types.WEBSITE_CHANGE_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.filter },
      };
    case types.WEBSITE_CHANGE_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.pagination },
      };
    default:
      return state;
  }
}
