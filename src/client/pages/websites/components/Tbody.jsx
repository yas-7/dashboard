import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteContainer from '../containers/WebsiteContainer';

class Tbody extends Component {
  componentDidMount () {
    const { fetchWebsites, order, pagination } = this.props;
    const limit = pagination.limit ? pagination.limit : 2;
    const offset = pagination.offset ? pagination.offset : 0;
    fetchWebsites({ ...order, limit, offset });
  }

  render () {
    const {
      error,
      loading,
      websites,
    } = this.props;

    if (error) {
      return <p>An error has occurred! Please reload page</p>;
    }
    if (loading) {
      return null;
    }

    return (
      <tbody>
        {websites.allIds.map((id) => {
          const website = websites.byId[id];
          return (
            <WebsiteContainer
              key={id}
              website={website}
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
  websites: PropTypes.object.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  order: PropTypes.object,
  pagination: PropTypes.object,
};

export default Tbody;
