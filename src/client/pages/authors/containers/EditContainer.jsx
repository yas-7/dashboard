import { connect } from 'react-redux';
import * as actions from '../actions';
import EditForm from '../components/EditForm';

const mapDispatchToProps = {
  addAuthor: actions.addAuthor,
  updateAuthor: actions.updateAuthor,
  editAuthorFields: actions.editAuthorFields,
};

function mapStateToProps (state) {
  return {
    currentAuthor: state.authorsData.currentAuthor,
    authors: state.authorsData.authors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
