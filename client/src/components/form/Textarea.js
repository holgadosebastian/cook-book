import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, value, placeholder, onChange, ...rest }) => {
  return (
    <textarea
      id={id}
      className='textarea'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    ></textarea>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
