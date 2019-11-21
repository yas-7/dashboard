import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorsContainer from './AuthorsContainer';
import EditContainer from './EditContainer';
import Popup from '../../../components/Popup';
import Header from '../../../components/Header';
import { editAuthorFields, hideMessage } from '../actions';
import Notification from '../../../components/Notification';

const AuthorsPage = ({ isPopupActive, editAuthorFields, notification, hideMessage }) => (
  <React.Fragment>
    <Header addHandler={editAuthorFields} />
    <AuthorsContainer />
    <Popup isPopupActive={isPopupActive}><EditContainer /></Popup>
    <Notification message={notification} hideMessage={hideMessage} />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  isPopupActive: state.authorsData.isPopupActive,
  notification: state.authorsData.notification,
});

const mapDispatchToProps = {
  editAuthorFields,
  hideMessage,
};


AuthorsPage.propTypes = {
  isPopupActive: PropTypes.bool,
  editAuthorFields: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  notification: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
