import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const showEmptyForm = () => {
    const { addHandler } = props;
    addHandler();
  };
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink exact className="header__link" to="/">Articles</NavLink>
        <NavLink className="header__link" to="/authors">Authors</NavLink>
        <NavLink className="header__link" to="/websites">Websites</NavLink>
      </nav>
      <div className="header__actions">
        <button
          className="header__add-btn btn"
          type="button"
          onClick={showEmptyForm}
        >
         Add new
        </button>
        {props.children}
      </div>

    </header>

  );
};
export default Header;
