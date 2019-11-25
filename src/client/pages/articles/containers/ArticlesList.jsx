import React from 'react';
import { connect } from 'react-redux';
import Thead from '../../../components/Thead';
import TbodyContainer from './TbodyContainer';
import * as actions from '../actions';

const ArticlesList = (props) => {
  const {
    fetchArticles,
    changeOrder,
    filter,
    order,
    pagination,
  } = props;

  const headers = {
    title: 'Title',
    description: 'Description',
    url: 'URL',
    'Author.name': 'Author',
    'Website.name': 'Domain',
  };

  return (
    <div className="content">
      <table className="table">
        <Thead
          headers={headers}
          fetchData={fetchArticles}
          changeOrder={changeOrder}
          filter={filter}
          order={order}
          pagination={pagination}
        />
        <TbodyContainer />
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.articlesData.order,
  filter: state.articlesData.filter,
  pagination: state.articlesData.pagination,
});

const mapDispatchToProps = {
  fetchArticles: actions.fetchArticles,
  changeOrder: actions.changeOrder,
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
