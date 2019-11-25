import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorsList from './AuthorsList';
import EditContainer from './EditContainer';
import Popup from '../../../components/Popup';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';
import { editAuthorFields, hideMessage, changePagination, fetchAuthors } from '../actions';
import Notification from '../../../components/Notification';

const AuthorsPage = ({
  isPopupActive,
  editAuthorFields,
  changePagination,
  fetchAuthors,
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
    fetchData: fetchAuthors,
    filter,
  };
  return (
    <React.Fragment>
      <Header addHandler={editAuthorFields} />
      <AuthorsList />
      <Popup isPopupActive={isPopupActive}><EditContainer /></Popup>
      <Pagination paginationProps={paginationProps} />
      <Notification message={notification} hideMessage={hideMessage} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isPopupActive: state.authorsData.isPopupActive,
  notification: state.authorsData.notification,
  order: state.authorsData.order,
  filter: state.authorsData.filter,
  pagination: state.authorsData.pagination,
});

const mapDispatchToProps = {
  editAuthorFields,
  hideMessage,
  changePagination,
  fetchAuthors,
};

AuthorsPage.propTypes = {
  isPopupActive: PropTypes.bool,
  editAuthorFields: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  notification: PropTypes.string,
  changePagination: PropTypes.func.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
