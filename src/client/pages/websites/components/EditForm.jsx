import React from 'react';
import PropTypes from 'prop-types';

const EditForm = (props) => {
  const {
    currentWebsite,
    updateWebsite,
    addWebsite,
    editWebsiteFields,
    cancelEdit,
    changeFilter,
    fetchWebsites,
    filter,
    order,
    pagination,
  } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentWebsite.isEditing) {
      await updateWebsite(currentWebsite);
    } else {
      await addWebsite(currentWebsite);
    }
    changeFilter({ searchValue: '' });
    fetchWebsites({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
  };

  const editFields = ({ target }) => {
    const { name, value } = target;
    editWebsiteFields({ [name]: value });
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
        placeholder="Website name"
        value={currentWebsite.name}
        onChange={editFields}
      />
      <input className="btn form__submit" type="submit" value="Save" />
    </form>
  );
};

EditForm.propTypes = {
  currentWebsite: PropTypes.object.isRequired,
  updateWebsite: PropTypes.func.isRequired,
  addWebsite: PropTypes.func.isRequired,
  editWebsiteFields: PropTypes.func,
  cancelEdit: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default EditForm;
