import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Thead = (props) => {
  const { fetchArticles, changeOrder, filter, order, pagination } = props;

  const handleOrder = (orderBy, direction) => {
    changeOrder({ orderBy, direction });
    fetchArticles({ orderBy, direction, ...filter, ...pagination, offset: 0 });
  };

  const headers = {
    title: 'Title',
    description: 'Description',
    url: 'URL',
    'Author.name': 'Author',
    'Website.name': 'Domain',
  };

  const getClsNames = (orderBy, direction) => cn({
    order: true,
    asc: direction === 'asc',
    desc: direction === 'desc',
    active: orderBy === order.orderBy && direction === order.direction,
  });

  return (
    <thead>
      <tr>
        {Object.keys(headers).map((item) => (
          <th key={item} className="table__head">
            <span>{headers[item]}</span>
            <span
              className={getClsNames(item, 'asc')}
              onClick={() => handleOrder(item, 'asc')}
            />
            <span
              className={getClsNames(item, 'desc')}
              onClick={() => handleOrder(item, 'desc')}
            />
          </th>
        ))}
        <th className="table__head table__head--sm">
          <span>Edit / Delete</span>
        </th>
      </tr>
    </thead>
  );

};

Thead.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  filter: PropTypes.object,
  order: PropTypes.object,
  pagination: PropTypes.object,
};

export default Thead;
