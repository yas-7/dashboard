import { connect } from 'react-redux';
import Article from '../components/Article';
import * as actions from '../actions';
import {
  getWebsiteById,
  getAuthorById,
} from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  author: getAuthorById(state, ownProps.authorId),
  website: getWebsiteById(state, ownProps.websiteId),
  filter: state.articlesData.filter,
  order: state.articlesData.order,
  pagination: state.articlesData.pagination,
});

const mapDispatchToProps = {
  deleteArticle: actions.deleteArticle,
  editArticleFields: actions.editArticleFields,
  fetchArticles: actions.fetchArticles,
  changeFilter: actions.changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
