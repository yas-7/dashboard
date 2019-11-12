import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorsContainer from './AuthorsContainer';
import EditContainer from './EditContainer';

const AuthorsPage = ({ isPopupActive }) => (
  <div>
    <AuthorsContainer />
    {isPopupActive ? <EditContainer /> : null}
  </div>
);

AuthorsPage.propTypes = { isPopupActive: PropTypes.bool };

export default connect((state) => ({ isPopupActive: state.authorsData.isPopupActive }))(AuthorsPage);
