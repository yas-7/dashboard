import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleContainer from '../containers/ArticleContainer';

class Tbody extends Component {
  componentDidMount () {
    const { fetchArticles, order, pagination } = this.props;
    fetchArticles({ ...order, ...pagination });
  }

  render () {
    const {
      error,
      loading,
      articles,
    } = this.props;

    if (error) {
      return <p>An error has occurred! Please reload page</p>;
    }
    if (loading) {
      return null;
    }

    return (
      <tbody>
        {articles.allIds.map((id) => {
          const article = articles.byId[id];
          const { AuthorId, WebsiteId } = article;
          return (
            <ArticleContainer
              key={id}
              article={article}
              authorId={AuthorId}
              websiteId={WebsiteId}
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
  articles: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  order: PropTypes.object,
  pagination: PropTypes.object,
};

export default Tbody;
