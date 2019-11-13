import React from 'react';
import PropTypes from 'prop-types';


const EditForm = (props) => {

  const {
    currentWebsite,
    updateWebsite,
    addWebsite,
    editWebsiteFields,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentWebsite.isEditing) {
      updateWebsite(currentWebsite);
    } else {
      addWebsite(currentWebsite);
    }
  };

  const editFields = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    editWebsiteFields({ [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="name"
        placeholder="Website name"
        value={currentWebsite.name}
        onChange={editFields}
      />
      <input type="submit" value="Save" />
    </form>
  );
};


EditForm.propTypes = {
  currentWebsite: PropTypes.object.isRequired,
  updateWebsite: PropTypes.func.isRequired,
  addWebsite: PropTypes.func.isRequired,
  editWebsiteFields: PropTypes.func,
};

export default EditForm;
