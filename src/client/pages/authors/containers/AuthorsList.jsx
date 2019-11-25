import React from 'react';
import { connect } from 'react-redux';
import Thead from '../../../components/Thead';
import TbodyContainer from './TbodyContainer';
import * as actions from '../actions';

const AuthorsList = (props) => {
  const {
    fetchAuthors,
    changeOrder,
    filter,
    order,
    pagination,
  } = props;
  const headers = { name: 'Name' };
  return (
    <div className="content">
      <table className="table">
        <Thead
          headers={headers}
          fetchData={fetchAuthors}
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
  order: state.authorsData.order,
  filter: state.authorsData.filter,
  pagination: state.authorsData.pagination,
});

const mapDispatchToProps = {
  fetchAuthors: actions.fetchAuthors,
  changeOrder: actions.changeOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);
