import { connect } from 'react-redux';
import * as actions from '../actions';
import Tbody from '../components/Tbody';

const mapStateToProps = (state) => ({
  error: state.websitesData.error,
  loading: state.websitesData.loading,
  websites: state.websitesData.websites,
  order: state.websitesData.order,
  pagination: state.websitesData.pagination,
  limit: state.websitesData.limit,
});

const mapDispatchToProps = { fetchWebsites: actions.fetchWebsites };


export default connect(mapStateToProps, mapDispatchToProps)(Tbody);
