import { connect } from 'react-redux';
import WebsitesList from '../components/WebsitesList';
import * as actions from '../actions';

import { getWebsitesIds } from '../reducers';

const mapDispatchToProps = {
  fetchWebsites: actions.fetchWebsites,
  editWebsiteFields: actions.editWebsiteFields,
};

function mapStateToProps (state) {
  return {
    error: state.websitesData.error,
    loading: state.websitesData.loading,
    websitesIds: getWebsitesIds(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesList);
