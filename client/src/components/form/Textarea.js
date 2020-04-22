import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, value, onChange }) => {
  return (
    <textarea
      id={id}
      className='textarea'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
