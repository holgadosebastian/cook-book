import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser } = authContext;

  const [menuOpen, setMenuOpen] = useState(false);

  const authLinks = (
    <Fragment>
      <Link
        to='/register'
        className='button is-rounded is-light is-block-touch'
      >
        My account
      </Link>
      <span
        className='button is-rounded is-primary is-inverted is-outlined is-block-touch'
        onClick={() => logoutUser()}
      >
        Logout
      </span>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link
        to='/register'
        className='button is-rounded is-light is-uppercase is-block-touch'
      >
        Register
      </Link>
      <Link
        to='/login'
        className='button is-rounded is-primary is-inverted is-outlined is-uppercase is-block-touch'
      >
        Log in
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
          Cook Book
        </Link>

        <span
          role='button'
          className='navbar-burger burger'
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
            <div className='buttons is-block-touch'>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
