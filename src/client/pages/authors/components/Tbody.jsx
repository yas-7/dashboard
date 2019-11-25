import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthorContainer from '../containers/AuthorContainer';

class Tbody extends Component {
  componentDidMount () {
    const { fetchAuthors, order, pagination } = this.props;
    const limit = pagination.limit ? pagination.limit : 2;
    const offset = pagination.offset ? pagination.offset : 0;
    fetchAuthors({ ...order, limit, offset });
  }

  render () {
    const {
      error,
      loading,
      authors,
    } = this.props;

    if (error) {
      return <p>An error has occurred! Please reload page</p>;
    }
    if (loading) {
      return null;
    }

    return (
      <tbody>
        {authors.allIds.map((id) => {
          const author = authors.byId[id];
          return (
            <AuthorContainer
              key={id}
              author={author}
            />
          );
        })}
      </tbody>
    );
  }
}

Tbody.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authors: PropTypes.object.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  order: PropTypes.object,
  pagination: PropTypes.object,
};

export default Tbody;
