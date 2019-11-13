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
      websitesIds,
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
          {websitesIds.map((id) => (
            <li key={id}>
              <WebsiteContainer websiteId={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

WebsitesList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  websitesIds: PropTypes.array.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  editWebsiteFields: PropTypes.func.isRequired,
};

export default WebsitesList;
