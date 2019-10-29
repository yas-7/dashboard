import React, { Component } from 'react';

export default class App extends Component {
  state = { authors: null };

  componentDidMount() {
    fetch('/api/authors')
      .then(res => res.json())
      .then(authors => this.setState({ authors }));
  }

  render() {
    const { authors } = this.state;
    return (
      <div>
        <p>authors:</p>
        {authors && authors.map(author => <p key={author.id}>{author.name}</p>)}
      </div>
    );
  }
}
