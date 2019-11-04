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
      updateAuthor,
      editAuthorFields,
    } = this.props;
    
    return (
      <AuthorsList
        authors={authors}
        currentAuthor={currentAuthor}
        addAuthor={addAuthor}
        deleteAuthor={deleteAuthor}
        updateAuthor={updateAuthor}
        editAuthorFields={editAuthorFields}/>
    );
  }
}

const mapDispatchToProps = {
  addAuthor: actions.addAuthor,
  fetchAuthors: actions.fetchAuthors,
  deleteAuthor: actions.deleteAuthor,
  updateAuthor: actions.updateAuthor,
  editAuthorFields: actions.editAuthorFields,
}

function mapStateToProps(state) {
  return {
    authors: state.authorsData.authors,
    currentAuthor: state.authorsData.currentAuthor
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authors);