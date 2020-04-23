import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, value, type = 'text', onChange, ...rest }) => {
  return (
    <input
      id={id}
      className='input'
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
