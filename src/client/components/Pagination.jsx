import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ paginationProps }) => {
  const {
    pagination,
    order,
    fetchData,
    changePagination,
    filter,
  } = paginationProps;

  const itemsPerPage = [ 2, 5, 10 ];
  const { offset, limit, count } = pagination;
  const totalPage = Math.ceil(count / limit);
  const currentPage = 1 + offset / limit;

  const handleClick = (multiplier = 1) => {
    const newOffset = limit * (multiplier) + offset;
    changePagination({ offset: newOffset });
    fetchData({ ...filter, ...order, offset: newOffset, limit });
  };

  const handleItemsPerPage = ({ target }) => {
    const { value } = target;
    changePagination({ limit: Number(value) });
    fetchData({ ...filter, ...order, offset: 0, limit: Number(value) });
  };

  return (
    <div className="pagination">
      <div className="pagination__group">
        <span className="pagination__info">{currentPage}</span>
        <span className="pagination__info">of</span>
        <span className="pagination__info">{totalPage}</span>
        <button
          className="btn pagination__control"
          type="button"
          disabled={offset <= 0}
          onClick={() => handleClick(-1)}
        >
        Prev
        </button>
        <button
          className="btn pagination__control"
          type="button"
          disabled={(offset + limit) >= count}
          onClick={() => handleClick()}
        >
        Next
        </button>
      </div>
      <div className="pagination__group">
        <span className="pagination__info">Items per page</span>
        <select
          className="pagination__select"
          value={limit}
          onChange={handleItemsPerPage}
          name="AuthorId"
        >
          {itemsPerPage.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  paginationProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func,
  changePagination: PropTypes.func,
  pagination: PropTypes.object,
  order: PropTypes.object,
  filter: PropTypes.object,
};

export default Pagination;
