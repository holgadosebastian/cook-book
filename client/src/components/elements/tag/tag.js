import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TagGroup from './components/tagGroup';

const Tag = ({ className, children, color, remove, ...props }) => {
  return (
    <span
      {...props}
      className={classnames('tag', 'is-uppercase', className, {
        [`is-${color}`]: color,
        'is-delete': remove
      })}
    >
      {!remove && children}
    </span>
  );
};

Tag.Group = TagGroup;

Tag.defaultProps = {
  style: undefined,
  className: undefined,
  color: undefined,
  remove: false
};

Tag.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  remove: PropTypes.bool
};

export default Tag;
