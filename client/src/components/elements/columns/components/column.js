import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Column = ({ className, children, size, ...props }) => {
  return (
    <div
      {...props}
      className={classnames('column', className, {
        [`is-${size}`]: size
      })}
    >
      {children}
    </div>
  );
};

Column.defaultProps = {
  style: undefined,
  className: undefined,
  size: undefined
};

Column.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.number
};

export default Column;
