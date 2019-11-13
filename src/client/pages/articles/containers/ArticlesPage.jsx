import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import EditContainer from './EditContainer';

const ArticlePage = ({ isPopupActive }) => (
  <div>
    <ArticlesContainer />
    {isPopupActive ? <EditContainer /> : null}
  </div>
);

ArticlePage.propTypes = { isPopupActive: PropTypes.bool };

export default connect((state) => ({ isPopupActive: state.articlesData.isPopupActive }))(ArticlePage);
