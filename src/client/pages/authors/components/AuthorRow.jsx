import React from 'react';
import PropTypes from 'prop-types';
import { EditButton, DeleteButton } from '../../../components/Buttons';

const AuthorRow = ({
  author,
  deleteAuthor,
  editAuthorFields,
  fetchAuthors,
  changeFilter,
  filter,
  order,
  pagination,
}) => {

  const handleDeleteAuthor = async (id) => {
    await deleteAuthor(id);
    changeFilter({ searchValue: '' });
    fetchAuthors({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
  };

  return (
    <tr>
      <td className="table__data">{author.name}</td>
      <td className="table__data">
        <EditButton handleEdit={editAuthorFields} item={author} />
        <DeleteButton handleDelete={handleDeleteAuthor} id={author.id} />
      </td>
    </tr>
  );
};

AuthorRow.propTypes = {
  editAuthorFields: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default AuthorRow;
