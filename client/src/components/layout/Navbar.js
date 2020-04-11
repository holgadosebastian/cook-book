import React from 'react';

const Navbar = () => {
  return (
    <nav
      className='navbar has-background-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <a className='navbar-item has-text-white' href='/'>
          Cook Book
        </a>

        <span
          href='#'
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </span>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <span className='navbar-item' href='#'>
            Home
          </span>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <span className='button is-rounded is-light' href='#'>
                <strong>Sign up</strong>
              </span>
              <span
                className='button is-rounded is-primary is-inverted is-outlined'
                href='#'
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
