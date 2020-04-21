import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  color = 'primary',
  loading,
  cssClasses,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      style={{ marginTop: '24px' }}
      className={`button is-${color} is-rounded is-uppercase ${cssClasses} ${
        loading && 'is-loading'
      }`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  cssClases: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
