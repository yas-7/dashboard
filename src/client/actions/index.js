export const AUTHORS_REQUEST = 'AUTHORS_REQUEST'
export const AUTHORS_FETCHED = 'AUTHORS_FETCHED'
export const AUTHORS_FAIL = 'AUTHORS_FAIL'

export const AUTHOR_ADD_REQUEST = 'AUTHOR_ADD_REQUEST'
export const AUTHOR_ADD_FAIL = 'AUTHOR_ADD_FAIL'
export const AUTHOR_ADD_SUCCESS = 'AUTHOR_ADD_SUCCESS'

export const AUTHOR_DELETE_REQUEST = 'AUTHOR_DELETE_REQUEST'
export const AUTHOR_DELETE_FAIL = 'AUTHOR_DELETE_FAIL'
export const AUTHOR_DELETE_SUCCESS = 'AUTHOR_DELETE_SUCCESS'

export const AUTHOR_UPDATE_REQUEST = 'AUTHOR_UPDATE_REQUEST'
export const AUTHOR_UPDATE_FAIL = 'AUTHOR_UPDATE_FAIL'
export const AUTHOR_UPDATE_SUCCESS = 'AUTHOR_UPDATE_SUCCESS'

export const AUTHOR_FIELDS_EDIT = 'AUTHOR_FIELDS_EDIT'


export const fetchAuthors = () => dispatch => {
  dispatch({
    type: AUTHORS_REQUEST,
  })
  return fetch(`/api/authors`)
    .then(
      response => response.json(),
      error => dispatch({ type: AUTHORS_FAIL, error })
    )
    .then(authors => dispatch({ type: AUTHORS_FETCHED, authors }))
}

export const addAuthor = (author) => dispatch => {
  const data = { author: { name: author.name } }
  dispatch({
    type: AUTHOR_ADD_REQUEST,
  })
  return fetch(`/api/authors`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
  })
    .then(
      response => response.json(),
      error => dispatch({ type: AUTHOR_ADD_FAIL, error })
    )
    .then(author => dispatch({ type: AUTHOR_ADD_SUCCESS, author }))
}

export const deleteAuthor = (id) => dispatch => {
  dispatch({
    type: AUTHOR_DELETE_REQUEST,
  })
  return fetch(`/api/authors/${id}`, { method: 'DELETE' })
    .then(
      response => response.json(),
      error => dispatch({ type: AUTHOR_DELETE_FAIL, error })
    )
    .then(() => dispatch({ type: AUTHOR_DELETE_SUCCESS, id }))
}

export const updateAuthor = (author) => dispatch => {
  const data = { author: { name: author.name } }
  dispatch({
    type: AUTHOR_UPDATE_REQUEST,
  })
  return fetch(`/api/authors/${author.id}`, {
    method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
  })
    .then(
      response => response.json(),
      error => dispatch({ type: AUTHOR_UPDATE_FAIL, error })
    )
    .then(author => dispatch({ type: AUTHOR_UPDATE_SUCCESS, author }))
}

export const editAuthorFields = author => dispatch =>
    dispatch({ type: AUTHOR_FIELDS_EDIT, payload: author })