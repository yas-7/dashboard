import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../images/garbage.svg';
import EditIcon from '../images/edit.svg';

export const EditButton = ({ handleEdit, item }) => (
  <button
    className="table__button"
    type="button"
    onClick={() => handleEdit({ ...item, isEditing: true })}
  >
    <EditIcon className="table__icon" />
  </button>
);

export const DeleteButton = ({ id, handleDelete }) => (
  <button
    className="table__button"
    type="button"
    onClick={() => handleDelete(id)}
  >
    <DeleteIcon className="table__icon" />
  </button>
);

EditButton.propTypes = {
  item: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
