import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ color = 'primary', label, cssClasses }) => {
  return (
    <span className={`tag is-${color} ${cssClasses} is-uppercase`}>
      {label}
    </span>
  );
};

Tag.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  cssClasses: PropTypes.string
};

export default Tag;
