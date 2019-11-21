import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../../images/garbage.svg';
import EditIcon from '../../../images/edit.svg';

const Article = (props) => {
  const {
    article,
    author,
    website,
    deleteArticle,
    editArticleFields,
    fetchArticles,
    changeFilter,
    filter,
    order,
    pagination,
  } = props;

  const handleDeleteArticle = async (id) => {
    await deleteArticle(id);
    changeFilter({ searchValue: '' });
    fetchArticles({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
  };

  return (
    <React.Fragment>
      <td className="table__data">{article.title}</td>
      <td className="table__data">{article.description}</td>
      <td className="table__data">{article.url}</td>
      <td className="table__data">{author.name}</td>
      <td className="table__data">{website.name}</td>
      <td className="table__data">
        <button
          className="table__button"
          type="button"
          onClick={() => editArticleFields({ ...article, isEditing: true })}
        >
          <EditIcon className="table__icon" />
        </button>
        <button
          className="table__button"
          type="button"
          onClick={() => handleDeleteArticle(article.id)}
        >
          <DeleteIcon className="table__icon" />
        </button>
      </td>
    </React.Fragment>
  );
};

Article.propTypes = {
  editArticleFields: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  website: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default Article;
