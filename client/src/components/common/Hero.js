import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Hero = ({ color, size, className, children, ...props }) => {
  let heroClassName = classnames(
    'hero',
    className,
    'background-image-centered',
    {
      [`is-${color}`]: color,
      [`is-${size}`]: size
    }
  );

  return (
    <section {...props} className={heroClassName}>
      <div className='hero-body'>
        <div className='container is-fluid'>{children}</div>
      </div>
    </section>
  );
};

Hero.defaultProps = {
  color: 'primary',
  size: undefined,
  className: undefined,
  style: undefined
};

Hero.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired
};

export default Hero;
