import React from 'react';

const AuthorsList = (props) => {
  const {
    currentAuthor,
    authors,
    updateAuthor,
    addAuthor,
    deleteAuthor,
    editAuthorFields
  } = props;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAuthor.isEditing) {
      updateAuthor(currentAuthor);
    } else {
      addAuthor(currentAuthor)
    }
  }

  const editFields =  e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name;
    editAuthorFields({ [name]: value })
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
            <button onClick={() => editAuthorFields({...author, isEditing: true})}>EDIT</button>
          </li>)}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Author name"
            value={currentAuthor.name}
            onChange={editFields}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
  )
}

export default AuthorsList;