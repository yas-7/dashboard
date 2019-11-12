import { connect } from 'react-redux';
import AuthorsList from '../components/AuthorsList';
import * as actions from '../actions';

import { getAuthorsIds } from '../reducers';

const mapDispatchToProps = {
  fetchAuthors: actions.fetchAuthors,
  editAuthorFields: actions.editAuthorFields,
};

function mapStateToProps (state) {
  return {
    error: state.authorsData.error,
    loading: state.authorsData.loading,
    authorsIds: getAuthorsIds(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);
