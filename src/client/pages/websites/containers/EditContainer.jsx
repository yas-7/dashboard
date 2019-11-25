import { connect } from 'react-redux';
import * as actions from '../actions';
import EditForm from '../components/EditForm';

const mapDispatchToProps = {
  addWebsite: actions.addWebsite,
  updateWebsite: actions.updateWebsite,
  editWebsiteFields: actions.editWebsiteFields,
  cancelEdit: actions.cancelEdit,
  fetchWebsites: actions.fetchWebsites,
  changeFilter: actions.changeFilter,
};

function mapStateToProps (state) {
  return {
    currentWebsite: state.websitesData.currentWebsite,
    websites: state.websitesData.websites,
    filter: state.websitesData.filter,
    order: state.websitesData.order,
    pagination: state.websitesData.pagination,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
