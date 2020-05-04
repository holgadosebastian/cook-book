import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Notification = ({
  className,
  children,
  type,
  float,
  onHide,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames('notification', className, {
        [`is-${type}`]: type,
        [`float-${float}`]: float
      })}
    >
      <button className='delete' onClick={onHide}></button>
      {children}
    </div>
  );
};

Notification.defaultProps = {
  className: undefined,
  children: null,
  type: 'primary',
  float: undefined,
  onHide: () => null
};

Notification.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  float: PropTypes.oneOf([
    'top-left',
    'top',
    'top-right',
    'bottom-right',
    'bottom',
    'bottom-left'
  ]),
  onHide: PropTypes.func
};

export default Notification;
