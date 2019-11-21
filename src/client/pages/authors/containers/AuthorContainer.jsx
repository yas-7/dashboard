import { connect } from 'react-redux';
import Author from '../components/Author';
import { deleteAuthor, editAuthorFields } from '../actions';

const mapDispatchToProps = {
  deleteAuthor,
  editAuthorFields,
};

export default connect(null, mapDispatchToProps)(Author);
