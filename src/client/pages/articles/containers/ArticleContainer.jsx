import { connect } from 'react-redux';
import Article from '../components/Article';
import { deleteArticle, editArticleFields } from '../actions';

import { getArticleById, getAuthorByArticleId } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  article: getArticleById(state, ownProps.articleId),
  author: getAuthorByArticleId(state, ownProps.articleId),
});

const mapDispatchToProps = {
  deleteArticle,
  editArticleFields,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
