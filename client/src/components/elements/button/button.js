import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({
  color,
  outlined,
  rounded,
  to,
  fullwidth,
  loading,
  disabled,
  onClick,
  className,
  children,
  ...props
}) => {
  let Element = to ? Link : 'button';

  return (
    <Element
      {...props}
      to={to}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classnames('button', 'is-uppercase', className, {
        [`is-${color}`]: color,
        'is-rounded': rounded,
        'is-outlined': outlined,
        'is-loading': loading,
        'is-fullwidth': fullwidth
      })}
    >
      {children}
    </Element>
  );
};

Button.defaultProps = {
  color: 'primary',
  outlined: false,
  rounded: true,
  fullwidth: false,
  loading: false,
  to: undefined,
  className: undefined,
  onClick: () => null,
  disabled: false
};

Button.propTypes = {
  color: PropTypes.string,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  fullwidth: PropTypes.bool,
  loading: PropTypes.bool,
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

export default Button;
