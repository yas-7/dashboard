import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthorContainer from '../containers/AuthorContainer';

class AuthorsList extends Component {
  componentDidMount () {
    const { fetchAuthors } = this.props;
    fetchAuthors();
  }

  showEmptyForm = (e) => {
    const { editAuthorFields } = this.props;
    editAuthorFields();
  }

  render () {
    const {
      error,
      loading,
      authors,
    } = this.props;

    if (error) {
      return error || <p>An error has occurred! Please reload page</p>;
    }

    if (loading) {
      return <p>Loading....</p>;
    }
    return (
      <ul>
        {authors.allIds.map((id) => (
          <li key={id}>
            <AuthorContainer author={authors.byId[id]} />
          </li>
        ))}
      </ul>
    );
  }
}

AuthorsList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authors: PropTypes.object.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  editAuthorFields: PropTypes.func.isRequired,
};

export default AuthorsList;
