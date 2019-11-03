import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthorsList from '../components/AuthorsList'
import * as actions from '../actions';

class Authors extends Component {
  componentDidMount() {
    this.props.fetchAuthors();
  }
  render() {
    const {
      authors,
      currentAuthor,
      addAuthor,
      deleteAuthor,
      editAuthor,
      editAuthorFields,
      startEditAuthor
    } = this.props;
    
    return (
      <AuthorsList
        authors={authors}
        currentAuthor={currentAuthor}
        addAuthor={addAuthor}
        deleteAuthor={deleteAuthor}
        editAuthor={editAuthor}
        editAuthorFields={editAuthorFields}
        startEditAuthor={startEditAuthor}/>
    );
  }
}

const mapDispatchToProps = {
  addAuthor: actions.addAuthor,
  fetchAuthors: actions.fetchAuthors,
  deleteAuthor: actions.deleteAuthor,
  editAuthor: actions.editAuthor,
  editAuthorFields: actions.editAuthorFields,
  startEditAuthor: actions.startEditAuthor
}

function mapStateToProps(state) {
  return {
    authors: state.authorsData.authors,
    currentAuthor: state.authorsData.currentAuthor
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authors);