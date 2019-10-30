import React, { Component } from 'react';

export default class AuthorsList extends Component {
  render() {
    const { error, isFetching, authors } = this.props.authors;

    if (error) {
      return <p>An error has occurred! Please reload page</p>
    }

    if (isFetching) {
      return <p>LOADING....</p>
    }
    
    return (
      <ul>
        { authors.map(author => <li key={author.id}>{author.name}</li>)}
      </ul>
  )
  }
}