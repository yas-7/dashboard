import { createSelector } from 'reselect';
import * as types from '../actions';

const emptyWebsite = {
  isEditing: false,
  name: '',
};
const initialState = {
  websites: {},
  error: null,
  loading: false,
  currentWebsite: emptyWebsite,
  isPopupActive: false,
};

export const websitesSelector = (state) => state.websitesData.websites;
export const getWebsitesIds = createSelector(
  websitesSelector,
  (result) => Object.keys(result)
);
export const getWebsiteById = (state, id) => websitesSelector(state)[id];


export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.WEBSITES_REQUEST:
      return { ...state, loading: true };
    case types.WEBSITES_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.WEBSITES_FETCHED:
      return {
        ...state,
        loading: false,
        websites: action.websites.reduce(
          (acc, item) => ({ ...acc, [item.id]: item }),
          {}
        ),
      };
    case types.WEBSITE_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.WEBSITE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        websites: { ...state.websites, [action.website.id]: action.website },
        currentWebsite: emptyWebsite,
        isPopupActive: false,
      };
    case types.WEBSITE_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.WEBSITE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.WEBSITE_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredWebsites } = state.websites;
      return {
        ...state,
        loading: false,
        error: null,
        websites: filteredWebsites,
      };
    case types.WEBSITE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.WEBSITE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.WEBSITE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        websites: { ...state.websites, [action.website.id]: action.website },
        currentWebsite: emptyWebsite,
        isPopupActive: false,
      };
    case types.WEBSITE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.WEBSITE_FIELDS_EDIT:
      return {
        ...state,
        currentWebsite: { ...state.currentWebsite, ...action.payload },
        isPopupActive: true,
      };
    default:
      return state;
  }
}
