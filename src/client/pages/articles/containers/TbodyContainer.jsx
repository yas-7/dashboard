import { connect } from 'react-redux';
import * as actions from '../actions';
import Tbody from '../components/Tbody';

const mapStateToProps = (state) => ({
  error: state.articlesData.error,
  loading: state.articlesData.loading,
  articles: state.articlesData.articles,
  order: state.articlesData.order,
  pagination: state.articlesData.pagination,
});

const mapDispatchToProps = { fetchArticles: actions.fetchArticles };


export default connect(mapStateToProps, mapDispatchToProps)(Tbody);
