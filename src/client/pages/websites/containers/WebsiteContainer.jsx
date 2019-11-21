import { connect } from 'react-redux';
import Website from '../components/Website';
import { deleteWebsite, editWebsiteFields } from '../actions';

const mapDispatchToProps = {
  deleteWebsite,
  editWebsiteFields,
};

export default connect(null, mapDispatchToProps)(Website);
