import { createSelector } from 'reselect';
import * as types from '../actions';

const emptyArticle = {
  isEditing: false,
  title: '',
  description: '',
  body: '',
  url: '',
  AuthorId: 1,
};
const initialState = {
  articles: {},
  error: null,
  loading: false,
  currentArticle: emptyArticle,
  isPopupActive: false,
};

export const articlesSelector = (state) => state.articlesData.articles;
export const authorsSelector = (state) => state.authorsData.authors;
export const getArticlesIds = createSelector(
  articlesSelector,
  (result) => Object.keys(result)
);

export const getArticleById = (state, id) => articlesSelector(state)[id];
export const getAuthorById = (state, id) => authorsSelector(state)[id];
export const getAuthorByArticleId = (state, id) => {
  const article = getArticleById(state, id);
  return getAuthorById(state, article.AuthorId);
};

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLES_REQUEST:
      return { ...state, loading: true };
    case types.ARTICLES_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.ARTICLES_FETCHED:
      return {
        ...state,
        loading: false,
        articles: action.articles.reduce(
          (acc, item) => {
            const { Author, website, ...article } = item;
            return { ...acc, [article.id]: { ...article, AuthorId: Author.id } };
          },
          {}
        ),
      };
    case types.ARTICLE_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ARTICLE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        articles: { ...state.articles, [action.article.id]: action.article },
        currentArticle: emptyArticle,
        isPopupActive: false,
      };
    case types.ARTICLE_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.ARTICLE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ARTICLE_DELETE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: omit, ...filteredArticles } = state.articles;
      return {
        ...state,
        loading: false,
        error: null,
        articles: filteredArticles,
      };
    case types.ARTICLE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.ARTICLE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ARTICLE_UPDATE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { Author, website, ...article } = action.article;
      return {
        ...state,
        loading: false,
        error: null,
        articles: { ...state.articles, [action.article.id]: article },
        currentArticle: emptyArticle,
        isPopupActive: false,
      };
    case types.ARTICLE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.ARTICLE_FIELDS_EDIT:
      return {
        ...state,
        currentArticle: { ...state.currentArticle, ...action.payload },
        isPopupActive: true,
      };
    default:
      return state;
  }
}
