import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorsList from '../components/AuthorsList';
import * as actions from '../actions';

class Authors extends Component {
  componentDidMount () {
    const { fetchAuthors } = this.props;
    fetchAuthors();
  }

  render () {
    const {
      error,
      loading,
      authors,
      currentAuthor,
      addAuthor,
      deleteAuthor,
      updateAuthor,
      editAuthorFields,
    } = this.props;

    return (
      <AuthorsList
        error={error}
        loading={loading}
        authors={authors}
        currentAuthor={currentAuthor}
        addAuthor={addAuthor}
        deleteAuthor={deleteAuthor}
        updateAuthor={updateAuthor}
        editAuthorFields={editAuthorFields}
      />
    );
  }
}

const mapDispatchToProps = {
  addAuthor: actions.addAuthor,
  fetchAuthors: actions.fetchAuthors,
  deleteAuthor: actions.deleteAuthor,
  updateAuthor: actions.updateAuthor,
  editAuthorFields: actions.editAuthorFields,
};

function mapStateToProps (state) {
  return {
    error: state.error,
    loading: state.loading,
    authors: state.authorsData.authors,
    currentAuthor: state.authorsData.currentAuthor,
  };
}

Authors.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  currentAuthor: PropTypes.shape({
    isEditing: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.object.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  editAuthorFields: PropTypes.func.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
