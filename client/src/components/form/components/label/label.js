import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ name, htmlFor, required }) => {
  return (
    <label
      className='label is-uppercase has-text-weight-light has-text-grey-darker'
      htmlFor={htmlFor}
    >
      {name} {required && <span className='has-text-danger'>*</span>}
    </label>
  );
};

Label.propTypes = {
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  required: PropTypes.bool
};

export default Label;
