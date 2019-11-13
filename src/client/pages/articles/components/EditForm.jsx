import React, { Component } from 'react';
import PropTypes from 'prop-types';


class EditForm extends Component {
  componentDidMount () {
    const { fetchAuthors, fetchWebsites } = this.props;
    fetchAuthors();
    fetchWebsites();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateArticle, addArticle, currentArticle } = this.props;
    if (currentArticle.isEditing) {
      updateArticle(currentArticle);
    } else {
      addArticle(currentArticle);
    }
  };

  editFields = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.editArticleFields({ [name]: value });
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
    } = this.props;


    if (websitesError || authorsError) {
      return <p>An error has occurred! Please reload page</p>;
    }

    if (websitesLoading || authorsLoading) {
      return <p>Loading....</p>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          required
          type="text"
          name="title"
          placeholder="Article title"
          value={currentArticle.title}
          onChange={this.editFields}
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Article description"
          value={currentArticle.description}
          onChange={this.editFields}
        />
        <input
          required
          type="text"
          name="url"
          placeholder="Article url"
          value={currentArticle.url}
          onChange={this.editFields}
        />
        <textarea name="body" value={currentArticle.body} onChange={this.editFields} />
        <select value={currentArticle.AuthorId} onChange={this.editFields} name="AuthorId">
          {Object.values(authors).map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select value={currentArticle.WebsiteId} onChange={this.editFields} name="WebsiteId">
          {Object.values(websites).map((website) => (
            <option key={website.id} value={website.id}>
              {website.name}
            </option>
          ))}
        </select>
        <input type="submit" value="Save" />
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
};

export default EditForm;
