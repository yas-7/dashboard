import React from 'react';
import PropTypes from 'prop-types';

const Author = ({ author, deleteAuthor, editAuthorFields }) => (
  <div>
    {author.name}
    {' '}
    <button type="button" onClick={() => deleteAuthor(author.id)}>DELETE</button>
    <button type="button" onClick={() => editAuthorFields({ ...author, isEditing: true })}>EDIT</button>
  </div>
);

Author.propTypes = {
  editAuthorFields: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired,
};


export default Author;
