import axios from 'axios';
import uniqBy from 'lodash.uniqby';
import { AUTHORS_FETCHED } from '../../authors/actions';
import { WEBSITES_FETCHED } from '../../websites/actions';

export const ARTICLES_REQUEST = 'ARTICLES_REQUEST';
export const ARTICLES_FETCHED = 'ARTICLES_FETCHED';
export const ARTICLES_FAIL = 'ARTICLES_FAIL';

export const ARTICLE_ADD_REQUEST = 'ARTICLE_ADD_REQUEST';
export const ARTICLE_ADD_FAIL = 'ARTICLE_ADD_FAIL';
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS';

export const ARTICLE_DELETE_REQUEST = 'ARTICLE_DELETE_REQUEST';
export const ARTICLE_DELETE_FAIL = 'ARTICLE_DELETE_FAIL';
export const ARTICLE_DELETE_SUCCESS = 'ARTICLE_DELETE_SUCCESS';

export const ARTICLE_UPDATE_REQUEST = 'ARTICLE_UPDATE_REQUEST';
export const ARTICLE_UPDATE_FAIL = 'ARTICLE_UPDATE_FAIL';
export const ARTICLE_UPDATE_SUCCESS = 'ARTICLE_UPDATE_SUCCESS';

export const ARTICLE_FIELDS_EDIT = 'ARTICLE_FIELDS_EDIT';
export const ARTICLE_CANCEL_EDIT = 'ARTICLE_CANCEL_EDIT';
export const ARTICLE_CHANGE_FILTER = 'ARTICLE_CHANGE_FILTER';
export const ARTICLE_CHANGE_ORDER = 'ARTICLE_CHANGE_ORDER';
export const ARTICLE_CHANGE_PAGINATION = 'ARTICLE_CHANGE_PAGINATION';

export const fetchArticles = (params) => (dispatch) => {
  dispatch({ type: ARTICLES_REQUEST });
  return axios
    .get('/api/articles', { params })
    .then((res) => {
      const { count, rows: articles } = res.data;
      const authors = uniqBy(articles.map((article) => article.Author), 'id');
      const websites = uniqBy(articles.map((article) => article.Website), 'id');
      dispatch({ type: AUTHORS_FETCHED, authors });
      dispatch({ type: WEBSITES_FETCHED, websites });
      dispatch({ type: ARTICLES_FETCHED, articles });
      dispatch({
        type: ARTICLE_CHANGE_PAGINATION,
        pagination: { limit: params.limit, offset: params.offset, count },
      });
    })
    .catch((error) => dispatch({ type: ARTICLES_FAIL, error: error.response }));
};

export const addArticle = (article) => (dispatch) => {
  dispatch({ type: ARTICLE_ADD_REQUEST });
  return axios
    .post('/api/articles', { article })
    .then((res) => dispatch({ type: ARTICLE_ADD_SUCCESS, article: res.data }))
    .catch((error) => dispatch({
      type: ARTICLE_ADD_FAIL,
      error: error.response,
    }));
};

export const deleteArticle = (id) => (dispatch) => {
  dispatch({ type: ARTICLE_DELETE_REQUEST });
  return axios
    .delete(`/api/articles/${id}`)
    .then(() => dispatch({ type: ARTICLE_DELETE_SUCCESS, id }))
    .catch((error) => dispatch({
      type: ARTICLE_DELETE_FAIL,
      error: error.response,
    }));
};

export const updateArticle = (article) => (dispatch) => {
  dispatch({ type: ARTICLE_UPDATE_REQUEST });
  return axios
    .put(`/api/articles/${article.id}`, { article })
    .then((res) => dispatch({
      type: ARTICLE_UPDATE_SUCCESS,
      article: res.data,
    }))
    .catch((error) => dispatch({
      type: ARTICLE_UPDATE_FAIL,
      error: error.response,
    }));
};

export const editArticleFields = (article) => (dispatch) => dispatch({
  type: ARTICLE_FIELDS_EDIT,
  payload: article,
});

export const changeFilter = (filter) => (dispatch) => dispatch({
  type: ARTICLE_CHANGE_FILTER,
  filter,
});

export const changeOrder = (order) => (dispatch) => dispatch({
  type: ARTICLE_CHANGE_ORDER,
  order,
});

export const changePagination = (pagination) => (dispatch) => dispatch({
  type: ARTICLE_CHANGE_PAGINATION,
  pagination,
});

export const cancelEdit = () => (dispatch) => dispatch({ type: ARTICLE_CANCEL_EDIT });
