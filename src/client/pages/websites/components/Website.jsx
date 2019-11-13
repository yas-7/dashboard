import React from 'react';
import PropTypes from 'prop-types';

const Website = ({ website, deleteWebsite, editWebsiteFields }) => (
  <div>
    {website.name}
    {' '}
    <button type="button" onClick={() => deleteWebsite(website.id)}>DELETE</button>
    <button type="button" onClick={() => editWebsiteFields({ ...website, isEditing: true })}>EDIT</button>
  </div>
);

Website.propTypes = {
  editWebsiteFields: PropTypes.func.isRequired,
  deleteWebsite: PropTypes.func.isRequired,
  website: PropTypes.object.isRequired,
};


export default Website;
