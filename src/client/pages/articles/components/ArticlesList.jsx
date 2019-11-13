import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleContainer from '../containers/ArticleContainer';

class ArticlesList extends Component {
  componentDidMount () {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

showEmptyForm = (e) => {
  const { editArticleFields } = this.props;
  editArticleFields();
}

render () {
  const {
    error,
    loading,
    articlesIds,
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
        {articlesIds.map((id) => (
          <li key={id}>
            <ArticleContainer articleId={id} />
          </li>
        ))}
      </ul>
    </div>

  );
}
}

ArticlesList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  fetchArticles: PropTypes.func.isRequired,
  editArticleFields: PropTypes.func.isRequired,
  articlesIds: PropTypes.array.isRequired,
};

export default ArticlesList;
