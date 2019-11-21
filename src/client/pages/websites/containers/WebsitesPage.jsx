import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WebsitesContainer from './WebsitesContainer';
import EditContainer from './EditContainer';
import Popup from '../../../components/Popup';
import Header from '../../../components/Header';
import { editWebsiteFields, hideMessage } from '../actions';
import Notification from '../../../components/Notification';

const WebsitesPage = ({ isPopupActive, editWebsiteFields, notification, hideMessage }) => (
  <React.Fragment>
    <Header addHandler={editWebsiteFields} />
    <WebsitesContainer />
    <Popup isPopupActive={isPopupActive}><EditContainer /></Popup>
    <Notification message={notification} hideMessage={hideMessage} />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  isPopupActive: state.websitesData.isPopupActive,
  notification: state.websitesData.notification,
});

const mapDispatchToProps = {
  editWebsiteFields,
  hideMessage,
};


WebsitesPage.propTypes = {
  isPopupActive: PropTypes.bool,
  editWebsiteFields: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  notification: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesPage);
