import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className='navbar has-background-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <Link
          to='/'
          className='navbar-item has-text-white has-text-weight-bold'
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
        <div className='navbar-start'>
          <span className='navbar-item'>Home</span>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Link
                to='/register'
                className='button is-rounded is-light'
                href='#'
              >
                <strong>Register</strong>
              </Link>
              <Link
                to='/login'
                className='button is-rounded is-primary is-inverted is-outlined'
              >
                Log in
              </Link>
              <Link
                to='/login'
                className='button is-rounded is-primary is-inverted is-outlined'
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
