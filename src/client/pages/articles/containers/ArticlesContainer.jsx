import { connect } from 'react-redux';
import * as actions from '../actions';
import ArticlesList from '../components/ArticlesList';

import { getArticlesIds } from '../reducers';

const mapDispatchToProps = {
  fetchArticles: actions.fetchArticles,
  editArticleFields: actions.editArticleFields,
};

function mapStateToProps (state) {
  return {
    error: state.articlesData.error,
    loading: state.articlesData.loading,
    articlesIds: getArticlesIds(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
