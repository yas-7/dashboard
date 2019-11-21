import { connect } from 'react-redux';
import * as actions from '../actions';
import SearchForm from '../components/SearchForm';

const mapDispatchToProps = {
  fetchArticles: actions.fetchArticles,
  changeFilter: actions.changeFilter,
  changePagination: actions.changePagination,
};

const mapStateToProps = (state) => ({
  filter: state.articlesData.filter,
  order: state.articlesData.order,
  pagination: state.articlesData.pagination,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
