import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditForm extends Component {
  componentDidMount () {
    const { fetchAuthors, fetchWebsites } = this.props;
    fetchAuthors({});
    fetchWebsites({});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      updateArticle,
      addArticle,
      currentArticle,
      changeFilter,
      fetchArticles,
      filter,
      order,
      pagination,
    } = this.props;
    if (currentArticle.isEditing) {
      await updateArticle(currentArticle);
    } else {
      await addArticle(currentArticle);
    }
    changeFilter({ searchValue: '' });
    fetchArticles({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
  };

  editFields = ({ target }) => {
    const { name, value } = target;
    const { editArticleFields } = this.props;
    editArticleFields({ [name]: value });
  };

  render () {
    const {
      websitesLoading,
      authorsLoading,
      authorsError,
      websitesError,
      currentArticle,
      authors,
      websites,
      cancelEdit,
    } = this.props;

    if (websitesError || authorsError) {
      return <p>An error has occurred! Please reload page</p>;
    }

    if (websitesLoading || authorsLoading) {
      return <p>Loading....</p>;
    }

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <button className="form__close" type="button" onClick={cancelEdit}>
          &times;
        </button>
        <input
          className="form__item"
          required
          type="text"
          name="title"
          placeholder="Article title"
          value={currentArticle.title}
          onChange={this.editFields}
        />
        <input
          className="form__item"
          required
          type="text"
          name="description"
          placeholder="Article description"
          value={currentArticle.description}
          onChange={this.editFields}
        />
        <input
          className="form__item"
          required
          type="text"
          name="url"
          placeholder="Article url"
          value={currentArticle.url}
          onChange={this.editFields}
        />
        <textarea
          className="form__item form__item--textarea "
          name="body"
          value={currentArticle.body}
          onChange={this.editFields}
        />
        <select
          className="form__item"
          value={currentArticle.AuthorId}
          onChange={this.editFields}
          name="AuthorId"
        >
          {Object.values(authors).map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select
          className="form__item"
          value={currentArticle.WebsiteId}
          onChange={this.editFields}
          name="WebsiteId"
        >
          {Object.values(websites).map((website) => (
            <option key={website.id} value={website.id}>
              {website.name}
            </option>
          ))}
        </select>
        <input className="btn form__submit" type="submit" value="Save" />
      </form>
    );
  }
}

EditForm.propTypes = {
  currentArticle: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  websites: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
  addArticle: PropTypes.func.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  editArticleFields: PropTypes.func.isRequired,
  fetchWebsites: PropTypes.func.isRequired,
  websitesLoading: PropTypes.bool.isRequired,
  authorsLoading: PropTypes.bool.isRequired,
  authorsError: PropTypes.bool,
  websitesError: PropTypes.bool,
  cancelEdit: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default EditForm;
