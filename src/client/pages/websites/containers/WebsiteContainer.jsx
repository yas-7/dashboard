import { connect } from 'react-redux';
import Website from '../components/Website';
import { deleteWebsite, editWebsiteFields } from '../actions';

import { getWebsiteById } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  website: getWebsiteById(state, ownProps.websiteId),
// eslint-disable-next-line object-curly-newline
});

const mapDispatchToProps = {
  deleteWebsite,
  editWebsiteFields,
};

export default connect(mapStateToProps, mapDispatchToProps)(Website);
