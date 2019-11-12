import axios from 'axios';

export const AUTHORS_REQUEST = 'AUTHORS_REQUEST';
export const AUTHORS_FETCHED = 'AUTHORS_FETCHED';
export const AUTHORS_FAIL = 'AUTHORS_FAIL';

export const AUTHOR_ADD_REQUEST = 'AUTHOR_ADD_REQUEST';
export const AUTHOR_ADD_FAIL = 'AUTHOR_ADD_FAIL';
export const AUTHOR_ADD_SUCCESS = 'AUTHOR_ADD_SUCCESS';

export const AUTHOR_DELETE_REQUEST = 'AUTHOR_DELETE_REQUEST';
export const AUTHOR_DELETE_FAIL = 'AUTHOR_DELETE_FAIL';
export const AUTHOR_DELETE_SUCCESS = 'AUTHOR_DELETE_SUCCESS';

export const AUTHOR_UPDATE_REQUEST = 'AUTHOR_UPDATE_REQUEST';
export const AUTHOR_UPDATE_FAIL = 'AUTHOR_UPDATE_FAIL';
export const AUTHOR_UPDATE_SUCCESS = 'AUTHOR_UPDATE_SUCCESS';

export const AUTHOR_FIELDS_EDIT = 'AUTHOR_FIELDS_EDIT';

export const fetchAuthors = () => (dispatch) => {
  dispatch({ type: AUTHORS_REQUEST });
  return axios
    .get('/api/authors')
    .then((authors) => dispatch({
      type: AUTHORS_FETCHED,
      authors: authors.data,
    }))
    .catch((error) => dispatch({ type: AUTHORS_FAIL, error: error.response }));
};


export const addAuthor = (author) => (dispatch) => {
  dispatch({ type: AUTHOR_ADD_REQUEST });
  return axios
    .post('/api/authors', { author })
    .then((res) => dispatch({ type: AUTHOR_ADD_SUCCESS, author: res.data }))
    .catch((error) => dispatch({
      type: AUTHOR_ADD_FAIL,
      error: error.response,
    }));
};

export const deleteAuthor = (id) => (dispatch) => {
  dispatch({ type: AUTHOR_DELETE_REQUEST });
  return axios
    .delete(`/api/authors/${id}`)
    .then(() => dispatch({ type: AUTHOR_DELETE_SUCCESS, id }))
    .catch((error) => dispatch({
      type: AUTHOR_DELETE_FAIL,
      error: error.response,
    }));
};

export const updateAuthor = (author) => (dispatch) => {
  dispatch({ type: AUTHOR_UPDATE_REQUEST });
  return axios
    .put(`/api/authors/${author.id}`, { author })
    .then((res) => dispatch({ type: AUTHOR_UPDATE_SUCCESS, author: res.data }))
    .catch((error) => dispatch({
      type: AUTHOR_UPDATE_FAIL,
      error: error.response,
    }));
};

export const editAuthorFields = (author) => (dispatch) => dispatch({
  type: AUTHOR_FIELDS_EDIT,
  payload: author,
});
