import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticlesList from './ArticlesList';
import EditContainer from './EditContainer';
import Popup from '../../../components/Popup';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';
import { editArticleFields, fetchArticles, changePagination } from '../actions';
import SearchContainer from './SearchContainer';

const ArticlesPage = (props) => {
  const {
    isPopupActive,
    editArticleFields,
    changePagination,
    fetchArticles,
    pagination,
    order,
    filter,
  } = props;

  const paginationProps = {
    pagination,
    order,
    changePagination,
    fetchData: fetchArticles,
    filter,
  };

  return (
    <React.Fragment>
      <Header addHandler={editArticleFields}>
        <SearchContainer />
      </Header>
      <ArticlesList />
      <Pagination paginationProps={paginationProps} />
      <Popup isPopupActive={isPopupActive}><EditContainer /></Popup>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isPopupActive: state.articlesData.isPopupActive,
  order: state.articlesData.order,
  filter: state.articlesData.filter,
  pagination: state.articlesData.pagination,
});

const mapDispatchToProps = {
  editArticleFields,
  changePagination,
  fetchArticles,
};


ArticlesPage.propTypes = {
  isPopupActive: PropTypes.bool,
  editArticleFields: PropTypes.func.isRequired,
  changePagination: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
