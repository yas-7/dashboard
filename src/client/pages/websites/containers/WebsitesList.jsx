import React from 'react';
import { connect } from 'react-redux';
import Thead from '../../../components/Thead';
import TbodyContainer from './TbodyContainer';
import * as actions from '../actions';


const WebsitesList = (props) => {
  const {
    fetchWebsites,
    changeOrder,
    filter,
    order,
    pagination,
  } = props;

  const headers = { name: 'Author name' };

  return (
    <div className="content">
      <table className="table">
        <Thead
          headers={headers}
          fetchData={fetchWebsites}
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
  order: state.websitesData.order,
  filter: state.websitesData.filter,
  pagination: state.websitesData.pagination,
});

const mapDispatchToProps = {
  fetchWebsites: actions.fetchWebsites,
  changeOrder: actions.changeOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesList);
