import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ article, author, deleteArticle, editArticleFields }) => (
  <div>
    {article.title}
    {' '}
    {article.url}
    {' '}
    {author.name}
    {' '}
    <button type="button" onClick={() => deleteArticle(article.id)}>DELETE</button>
    <button type="button" onClick={() => editArticleFields({ ...article, isEditing: true })}>EDIT</button>
  </div>
);
Article.propTypes = {
  editArticleFields: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};


export default Article;
