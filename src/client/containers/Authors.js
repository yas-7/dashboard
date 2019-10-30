import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthorsList from '../components/AuthorsList'
import * as actions from '../actions';

class Authors extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchAuthors());
  }
  render() {
    const { authors } = this.props;
    return (
      <AuthorsList authors={authors}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    authors: state.authors
  };
}

export default connect(mapStateToProps)(Authors);