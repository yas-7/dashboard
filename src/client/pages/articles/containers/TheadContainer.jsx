import { connect } from 'react-redux';
import * as actions from '../actions';
import Thead from '../components/Thead';

const mapStateToProps = (state) => ({
  order: state.articlesData.order,
  filter: state.articlesData.filter,
  pagination: state.articlesData.pagination,
});

const mapDispatchToProps = {
  fetchArticles: actions.fetchArticles,
  changeOrder: actions.changeOrder,
};


export default connect(mapStateToProps, mapDispatchToProps)(Thead);
