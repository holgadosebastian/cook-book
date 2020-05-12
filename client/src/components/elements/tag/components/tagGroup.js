import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TagGroup = ({ className, children, ...props }) => {
  return (
    <span {...props} className={classnames('tags', 'has-addons', className)}>
      {children}
    </span>
  );
};

TagGroup.defaultProps = {
  style: undefined,
  className: undefined,
  children: null
};

TagGroup.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node
};

export default TagGroup;
