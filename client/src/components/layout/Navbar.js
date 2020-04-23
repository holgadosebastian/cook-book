import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, logoutUser } = authContext;

  const [menuOpen, setMenuOpen] = useState(false);

  const authLinks = (
    <Fragment>
      <Link
        to={`/users/${user !== null && user._id}`}
        className='navbar-item has-text-white has-text-centered is-uppercase'
      >
        My recipes
      </Link>
      <span
        className='navbar-item has-text-white has-text-centered is-uppercase'
        onClick={() => logoutUser()}
      >
        Logout
      </span>
      <Link
        to='/new-recipe'
        className='button is-rounded is-light is-block-touch is-uppercase'
      >
        Create Recipe
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link
        to='/login'
        className='navbar-item has-text-white has-text-centered is-uppercase'
      >
        Log in
      </Link>
      <Link
        to='/register'
        className='button is-rounded is-light is-uppercase is-block-touch'
      >
        Register
      </Link>
    </Fragment>
  );

  return (
    <nav
      className='navbar has-background-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <Link
          to='/'
          className='navbar-item has-text-white has-text-weight-medium is-uppercase'
        >
          Recipgeek
        </Link>

        <span
          role='button'
          className={`navbar-burger burger has-text-white ${
            menuOpen && 'is-active'
          }`}
          aria-label='menu'
          aria-expanded='false'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </span>
      </div>

      <div
        className={`navbar-menu has-background-primary ${
          menuOpen && 'is-active'
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className='navbar-end'>
          <div className='navbar-item'>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
