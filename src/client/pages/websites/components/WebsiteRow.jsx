import React from 'react';
import PropTypes from 'prop-types';
import { EditButton, DeleteButton } from '../../../components/Buttons';

const WebsiteRow = ({
  website,
  deleteWebsite,
  editWebsiteFields,
  fetchWebsites,
  changeFilter,
  filter,
  order,
  pagination,
}) => {
  const handleDeleteWebsite = async (id) => {
    await deleteWebsite(id);
    changeFilter({ searchValue: '' });
    fetchWebsites({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
  };
  return (
    <tr>
      <td className="table__data">{website.name}</td>
      <td className="table__data">
        <EditButton handleEdit={editWebsiteFields} item={website} />
        <DeleteButton handleDelete={handleDeleteWebsite} id={website.id} />
      </td>
    </tr>
  );
};

WebsiteRow.propTypes = {
  editWebsiteFields: PropTypes.func.isRequired,
  deleteWebsite: PropTypes.func.isRequired,
  website: PropTypes.object.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default WebsiteRow;
