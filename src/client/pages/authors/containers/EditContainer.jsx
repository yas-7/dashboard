import { connect } from 'react-redux';
import * as actions from '../actions';
import EditForm from '../components/EditForm';

const mapDispatchToProps = {
  addAuthor: actions.addAuthor,
  updateAuthor: actions.updateAuthor,
  editAuthorFields: actions.editAuthorFields,
  cancelEdit: actions.cancelEdit,
  fetchAuthors: actions.fetchAuthors,
  changeFilter: actions.changeFilter,
};

function mapStateToProps (state) {
  return {
    currentAuthor: state.authorsData.currentAuthor,
    authors: state.authorsData.authors,
    filter: state.authorsData.filter,
    order: state.authorsData.order,
    pagination: state.authorsData.pagination,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
