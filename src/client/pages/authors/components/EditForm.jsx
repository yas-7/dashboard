import React from 'react';
import PropTypes from 'prop-types';


const EditForm = (props) => {
  const {
    currentAuthor,
    updateAuthor,
    addAuthor,
    editAuthorFields,
    cancelEdit,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAuthor.isEditing) {
      updateAuthor(currentAuthor);
    } else {
      addAuthor(currentAuthor);
    }
  };

  const editFields = ({ target }) => {
    const { name, value } = target;
    editAuthorFields({ [name]: value });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <button className="form__close" type="button" onClick={cancelEdit}>
          &times;
      </button>
      <input
        className="form__item"
        required
        type="text"
        name="name"
        placeholder="Author name"
        value={currentAuthor.name}
        onChange={editFields}
      />
      <input className="btn form__submit" type="submit" value="Save" />
    </form>
  );
};

EditForm.propTypes = {
  currentAuthor: PropTypes.object.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  editAuthorFields: PropTypes.func,
  cancelEdit: PropTypes.func.isRequired,
};

export default EditForm;
