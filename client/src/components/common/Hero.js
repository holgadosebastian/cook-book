import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ color = 'primary', children }) => {
  return (
    <section className={`hero is-${color}`}>
      <div className='hero-body'>
        <div className='container is-fluid'>{children}</div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  color: PropTypes.string
};

export default Hero;
