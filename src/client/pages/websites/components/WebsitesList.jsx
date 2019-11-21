import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteContainer from '../containers/WebsiteContainer';

class WebsitesList extends Component {
  componentDidMount () {
    const { fetchWebsites } = this.props;
    fetchWebsites();
  }

  showEmptyForm = (e) => {
    const { editWebsiteFields } = this.props;
    editWebsiteFields();
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
      return <p>Loading....</p>;
    }
    return (
      <ul>
        {websites.allIds.map((id) => (
          <li key={id}>
            <WebsiteContainer website={websites.byId[id]} />
          </li>
        ))}
      </ul>
    );
  }
}

WebsitesList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  websites: PropTypes.object.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  editWebsiteFields: PropTypes.func.isRequired,
};

export default WebsitesList;
