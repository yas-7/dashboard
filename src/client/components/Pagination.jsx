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

  const { offset, limit, count } = pagination;
  const totalPage = Math.ceil(count / limit);
  const currentPage = 1 + offset / limit;

  const handleClick = (multiplier = 1) => {
    const newOffset = limit * (multiplier) + offset;
    changePagination({ offset: newOffset });
    fetchData({ ...filter, ...order, offset: newOffset, limit });
  };

  return (
    <div className="pagination">
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
        disabled={offset + limit >= count}
        onClick={() => handleClick()}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  paginationProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  changePagination: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default Pagination;
