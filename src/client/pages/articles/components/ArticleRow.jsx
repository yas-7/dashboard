import React from 'react';
import PropTypes from 'prop-types';
import { EditButton, DeleteButton } from '../../../components/Buttons';

const ArticleRow = (props) => {
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
    <tr>
      <td className="table__data">{article.title}</td>
      <td className="table__data">{article.description}</td>
      <td className="table__data">{article.url}</td>
      <td className="table__data">{author && author.name}</td>
      <td className="table__data">{website && website.name}</td>
      <td className="table__data">
        <EditButton handleEdit={editArticleFields} item={article} />
        <DeleteButton handleDelete={handleDeleteArticle} id={article.id} />
      </td>
    </tr>
  );
};

ArticleRow.propTypes = {
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

export default ArticleRow;
