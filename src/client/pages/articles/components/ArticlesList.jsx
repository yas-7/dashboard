import React from 'react';
import TheadContainer from '../containers/TheadContainer';
import TbodyContainer from '../containers/TbodyContainer';

const ArticlesList = (props) => (
  <div className="content">
    <table className="table">
      <TheadContainer />
      <TbodyContainer />
    </table>
  </div>
);

export default ArticlesList;
