import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  color = 'primary',
  outlined,
  loading,
  cssClasses,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`button is-${color} is-rounded is-uppercase ${cssClasses} ${
        loading && 'is-loading'
      } ${outlined && 'is-outlined'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  outlined: PropTypes.bool,
  loading: PropTypes.bool,
  cssClases: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;