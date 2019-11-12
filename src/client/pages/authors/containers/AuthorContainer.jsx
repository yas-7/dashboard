import { connect } from 'react-redux';
import Author from '../components/Author';
import { deleteAuthor, editAuthorFields } from '../actions';

import { getAuthorById } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  author: getAuthorById(state, ownProps.authorId),
// eslint-disable-next-line object-curly-newline
});

const mapDispatchToProps = {
  deleteAuthor,
  editAuthorFields,
};

export default connect(mapStateToProps, mapDispatchToProps)(Author);
