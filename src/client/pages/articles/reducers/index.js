import * as types from '../actions';

const emptyArticle = {
  isEditing: false,
  title: '',
  description: '',
  body: '',
  url: '',
  AuthorId: 1,
  WebsiteId: 1,
};
const initialState = {
  articles: { allIds: [], byId: {} },
  error: null,
  loading: false,
  currentArticle: emptyArticle,
  isPopupActive: false,
  filter: { searchBy: 'title', searchValue: '' },
  order: { orderBy: 'title', direction: 'asc' },
  pagination: {
    limit: 2,
    offset: 0,
    count: 0,
  },
};


export const authorsSelector = (state) => state.authorsData.authors.byId;
export const getAuthorById = (state, id) => authorsSelector(state)[id];
export const websitesSelector = (state) => state.websitesData.websites.byId;
export const getWebsiteById = (state, id) => websitesSelector(state)[id];

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLES_REQUEST:
    case types.ARTICLE_ADD_REQUEST:
    case types.ARTICLE_DELETE_REQUEST:
    case types.ARTICLE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.ARTICLES_FAIL:
    case types.ARTICLE_ADD_FAIL:
    case types.ARTICLE_DELETE_FAIL:
    case types.ARTICLE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.ARTICLES_FETCHED:
      return {
        ...state,
        loading: false,
        articles: action.articles.reduce(
          (acc, item) => {
            const { Author, Website, ...article } = item;
            return {
              byId: {
                ...acc.byId,
                [article.id]: {
                  ...article,
                  AuthorId: Author.id,
                  WebsiteId: Website.id,
                },
              },
              allIds: [ ...acc.allIds, article.id ],
            };
          },
          { allIds: [], byId: {} }
        ),
      };
    case types.ARTICLE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        articles: {
          byId: {
            ...state.articles.byId,
            [action.article.id]: action.article,
          },
          allIds: [ ...state.articles.allIds, action.article.id ],
        },
        currentArticle: emptyArticle,
        isPopupActive: false,
      };
    case types.ARTICLE_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredArticles } = state.articles.byId;
      return {
        ...state,
        loading: false,
        error: null,
        articles: {
          byId: filteredArticles,
          allIds: state.articles.allIds.filter((id) => id !== action.id),
        },
      };
    case types.ARTICLE_UPDATE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { Author, website, ...article } = action.article;
      return {
        ...state,
        loading: false,
        error: null,
        articles: {
          ...state.articles,
          byId: { ...state.articles.byId, [action.article.id]: article },
        },
        currentArticle: emptyArticle,
        isPopupActive: false,
      };
    case types.ARTICLE_FIELDS_EDIT:
      return {
        ...state,
        currentArticle: { ...state.currentArticle, ...action.payload },
        isPopupActive: true,
      };
    case types.ARTICLE_CHANGE_ORDER:
      return {
        ...state,
        order: { ...state.order, ...action.order },
      };
    case types.ARTICLE_CHANGE_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.filter },
      };
    case types.ARTICLE_CHANGE_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.pagination },
      };
    case types.ARTICLE_CANCEL_EDIT:
      return {
        ...state,
        currentArticle: emptyArticle,
        isPopupActive: false,
      };
    default:
      return state;
  }
}
