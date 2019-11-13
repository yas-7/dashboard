import { connect } from 'react-redux';
import * as actions from '../actions';
import EditForm from '../components/EditForm';

const mapDispatchToProps = {
  addWebsite: actions.addWebsite,
  updateWebsite: actions.updateWebsite,
  editWebsiteFields: actions.editWebsiteFields,
};

function mapStateToProps (state) {
  return {
    currentWebsite: state.websitesData.currentWebsite,
    websites: state.websitesData.websites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
