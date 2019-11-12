import React from 'react';
import PropTypes from 'prop-types';


const EditForm = (props) => {

  const { currentAuthor, updateAuthor, addAuthor, editAuthorFields } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAuthor.isEditing) {
      updateAuthor(currentAuthor);
    } else {
      addAuthor(currentAuthor);
    }
  };

  const editFields = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    editAuthorFields({ [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="name"
        placeholder="Author name"
        value={currentAuthor.name}
        onChange={editFields}
      />
      <input type="submit" value="Save" />
    </form>
  );
};


EditForm.propTypes = {
  currentAuthor: PropTypes.object.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  editAuthorFields: PropTypes.func,
};

export default EditForm;
