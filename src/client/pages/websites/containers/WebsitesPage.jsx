import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WebsitesContainer from './WebsitesContainer';
import EditContainer from './EditContainer';

const WebsitesPage = ({ isPopupActive }) => (
  <div>
    <WebsitesContainer />
    {isPopupActive ? <EditContainer /> : null}
  </div>
);


WebsitesPage.propTypes = { isPopupActive: PropTypes.bool };

export default connect((state) => ({ isPopupActive: state.websitesData.isPopupActive }))(WebsitesPage);
