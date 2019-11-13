import axios from 'axios';

export const WEBSITES_REQUEST = 'WEBSITES_REQUEST';
export const WEBSITES_FETCHED = 'WEBSITES_FETCHED';
export const WEBSITES_FAIL = 'WEBSITES_FAIL';

export const WEBSITE_ADD_REQUEST = 'WEBSITE_ADD_REQUEST';
export const WEBSITE_ADD_FAIL = 'WEBSITE_ADD_FAIL';
export const WEBSITE_ADD_SUCCESS = 'WEBSITE_ADD_SUCCESS';

export const WEBSITE_DELETE_REQUEST = 'WEBSITE_DELETE_REQUEST';
export const WEBSITE_DELETE_FAIL = 'WEBSITE_DELETE_FAIL';
export const WEBSITE_DELETE_SUCCESS = 'WEBSITE_DELETE_SUCCESS';

export const WEBSITE_UPDATE_REQUEST = 'WEBSITE_UPDATE_REQUEST';
export const WEBSITE_UPDATE_FAIL = 'WEBSITE_UPDATE_FAIL';
export const WEBSITE_UPDATE_SUCCESS = 'WEBSITE_UPDATE_SUCCESS';

export const WEBSITE_FIELDS_EDIT = 'WEBSITE_FIELDS_EDIT';

export const fetchWebsites = () => (dispatch) => {
  dispatch({ type: WEBSITES_REQUEST });
  return axios
    .get('/api/websites')
    .then((websites) => dispatch({
      type: WEBSITES_FETCHED,
      websites: websites.data,
    }))
    .catch((error) => dispatch({ type: WEBSITES_FAIL, error: error.response }));
};


export const addWebsite = (website) => (dispatch) => {
  dispatch({ type: WEBSITE_ADD_REQUEST });
  return axios
    .post('/api/websites', { website })
    .then((res) => dispatch({ type: WEBSITE_ADD_SUCCESS, website: res.data }))
    .catch((error) => dispatch({
      type: WEBSITE_ADD_FAIL,
      error: error.response,
    }));
};

export const deleteWebsite = (id) => (dispatch) => {
  dispatch({ type: WEBSITE_DELETE_REQUEST });
  return axios
    .delete(`/api/websites/${id}`)
    .then(() => dispatch({ type: WEBSITE_DELETE_SUCCESS, id }))
    .catch((error) => dispatch({
      type: WEBSITE_DELETE_FAIL,
      error: error.response,
    }));
};

export const updateWebsite = (website) => (dispatch) => {
  dispatch({ type: WEBSITE_UPDATE_REQUEST });
  return axios
    .put(`/api/websites/${website.id}`, { website })
    .then((res) => dispatch({
      type: WEBSITE_UPDATE_SUCCESS,
      website: res.data,
    }))
    .catch((error) => dispatch({
      type: WEBSITE_UPDATE_FAIL,
      error: error.response,
    }));
};

export const editWebsiteFields = (website) => (dispatch) => dispatch({
  type: WEBSITE_FIELDS_EDIT,
  payload: website,
});
