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
      authorsIds,
    } = this.props;

    if (error) {
      return <p>An error has occurred! Please reload page</p>;
    }

    if (loading) {
      return <p>Loading....</p>;
    }
    return (
      <div>
        <button type="button" onClick={this.showEmptyForm}>add new</button>
        <ul>
          {authorsIds.map((id) => (
            <li key={id}>
              <AuthorContainer authorId={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

AuthorsList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authorsIds: PropTypes.array.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  editAuthorFields: PropTypes.func.isRequired,
};

export default AuthorsList;
