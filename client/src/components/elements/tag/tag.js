import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tag = ({ className, color, label, ...props }) => {
  return (
    <span
      {...props}
      className={classnames('tag', 'is-uppercase', className, {
        [`is-${color}`]: color
      })}
    >
      {label}
    </span>
  );
};

Tag.defaultProps = {
  style: undefined,
  className: undefined,
  color: 'primary'
};

Tag.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.node.isRequired
};

export default Tag;
