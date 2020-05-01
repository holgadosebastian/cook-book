import React from 'react';

const Footer = () => {
  return (
    <div className='footer has-background-grey-darker has-text-white-ter'>
      <div className='container is-fluid'>
        <p className='has-text-centered'>
          RecipGeek by{' '}
          <a
            className='link has-text-primary'
            href='https://github.com/holgadosebastian'
          >
            Sebastian Holgado
          </a>
          . The source code is licensed{' '}
          <a
            className='link has-text-primary'
            href='https://opensource.org/licenses/mit-license.php'
          >
            MIT
          </a>
          . Source code can be found at{' '}
          <a
            className='link has-text-primary'
            href='https://github.com/holgadosebastian/cook-book'
          >
            Github
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Footer;
