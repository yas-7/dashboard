import { connect } from 'react-redux';
import * as actions from '../actions';
import Tbody from '../components/Tbody';

const mapStateToProps = (state) => ({
  error: state.authorsData.error,
  loading: state.authorsData.loading,
  authors: state.authorsData.authors,
  order: state.authorsData.order,
  pagination: state.authorsData.pagination,
  limit: state.authorsData.limit,
});

const mapDispatchToProps = { fetchAuthors: actions.fetchAuthors };


export default connect(mapStateToProps, mapDispatchToProps)(Tbody);
