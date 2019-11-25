import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WebsitesList from './WebsitesList';
import EditContainer from './EditContainer';
import Popup from '../../../components/Popup';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';
import { editWebsiteFields, hideMessage, fetchWebsites, changePagination } from '../actions';
import Notification from '../../../components/Notification';

const WebsitesPage = ({
  isPopupActive,
  editWebsiteFields,
  changePagination,
  fetchWebsites,
  pagination,
  order,
  filter,
  notification,
  hideMessage,
}) => {

  const paginationProps = {
    pagination,
    order,
    changePagination,
    fetchData: fetchWebsites,
    filter,
  };
  return (
    <React.Fragment>
      <Header addHandler={editWebsiteFields} />
      <WebsitesList />
      <Popup isPopupActive={isPopupActive}><EditContainer /></Popup>
      <Pagination paginationProps={paginationProps} />
      <Notification message={notification} hideMessage={hideMessage} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isPopupActive: state.websitesData.isPopupActive,
  notification: state.websitesData.notification,
  order: state.websitesData.order,
  filter: state.websitesData.filter,
  pagination: state.websitesData.pagination,
});

const mapDispatchToProps = {
  editWebsiteFields,
  hideMessage,
  changePagination,
  fetchWebsites,
};

WebsitesPage.propTypes = {
  isPopupActive: PropTypes.bool,
  editWebsiteFields: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  notification: PropTypes.string,
  changePagination: PropTypes.func.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesPage);
