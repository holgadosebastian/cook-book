import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange, error, errorMessage, type, ...props }) => {
  const handleChange = (e) => {
    let value = e.target.value;

    // Converts value to an int
    if (type === 'number') {
      value = parseInt(value);
    }

    onChange(value);
  };

  return (
    <Fragment>
      <input
        className={`input ${error ? 'is-danger' : ''}`}
        onChange={handleChange}
        type={type}
        {...props}
      />
      {error && errorMessage !== '' && (
        <p className='help is-danger'>{errorMessage}</p>
      )}
    </Fragment>
  );
};

Input.defaultProps = {
  id: undefined,
  type: 'text',
  error: false,
  errorMessage: ''
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default Input;
