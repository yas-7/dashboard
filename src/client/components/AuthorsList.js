import React from 'react';

const AuthorsList = (props) => {
  const {
    currentAuthor,
    authors,
    editAuthor,
    addAuthor,
    deleteAuthor,
    startEditAuthor,
    editAuthorFields
  } = props;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAuthor.isEditing) {
      editAuthor(currentAuthor);
    } else {
      addAuthor(currentAuthor)
    }
  }

  const { error, loading } = authors;
    if (error) {
      return <p>An error has occurred! Please reload page</p>
    }

    if (loading) {
      return <p>LOADING....</p>
    }

    return (
      <div>
        <ul>
          {Object.values(authors).map(author => <li key={author.id}>
            {author.name}
            <button onClick={() => deleteAuthor(author.id)}>DELETE</button>
            <button onClick={() => startEditAuthor(author)}>EDIT</button>
          </li>)}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Author name"
            value={currentAuthor.name}
            onChange={editAuthorFields}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
  )
}

export default AuthorsList;