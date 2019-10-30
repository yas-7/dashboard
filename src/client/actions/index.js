export const AUTHORS_REQUEST = 'AUTHORS_REQUEST'
export const AUTHORS_FETCHED = 'AUTHORS_FETCHED'
export const AUTHORS_FAIL = 'AUTHORS_FAIL'


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