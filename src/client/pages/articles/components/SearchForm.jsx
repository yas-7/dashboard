import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
  const {
    fetchArticles,
    changeFilter,
    filter,
    order,
    pagination,
    changePagination,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    changePagination({ offset: 0 });
    fetchArticles({ ...filter, ...order, ...pagination, offset: 0 });
  };

  const editFields = ({ target }) => {
    const { name, value } = target;
    changeFilter({ [name]: value });
    if (!value) {
      fetchArticles({ ...filter, searchValue: '', ...order, ...pagination, offset: 0 });
    }
  };

  const searchFields = {
    title: 'Title',
    description: 'Description',
    body: 'Text',
    'Author.name': 'Author',
    'Website.name': 'Domain',
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <select
        className="search-form__item"
        value={filter.searchBy}
        onChange={editFields}
        name="searchBy"
      >
        {Object.keys(searchFields).map((item) => (
          <option key={item} value={item}>
            {searchFields[item]}
          </option>
        ))}
      </select>
      <input
        className="search-form__item"
        type="search"
        name="searchValue"
        placeholder="Search value"
        value={filter.searchValue}
        onChange={editFields}
      />
      <input className="search-form__item" type="submit" value="Search" />
    </form>
  );
};

SearchForm.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.object,
  order: PropTypes.object,
  pagination: PropTypes.object,
  changePagination: PropTypes.func.isRequired,
};

export default SearchForm;
