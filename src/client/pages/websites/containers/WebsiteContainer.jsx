import { connect } from 'react-redux';
import WebsiteRow from '../components/WebsiteRow';
import { deleteWebsite, editWebsiteFields, fetchWebsites, changeFilter } from '../actions';

const mapStateToProps = (state) => ({
  filter: state.websitesData.filter,
  order: state.websitesData.order,
  pagination: state.websitesData.pagination,
});

const mapDispatchToProps = {
  deleteWebsite,
  editWebsiteFields,
  fetchWebsites,
  changeFilter,

};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteRow);
