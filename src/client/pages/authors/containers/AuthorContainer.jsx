import { connect } from 'react-redux';
import AuthorRow from '../components/AuthorRow';
import { deleteAuthor, editAuthorFields, fetchAuthors, changeFilter } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  filter: state.authorsData.filter,
  order: state.authorsData.order,
  pagination: state.authorsData.pagination,
});

const mapDispatchToProps = {
  deleteAuthor,
  editAuthorFields,
  fetchAuthors,
  changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorRow);
