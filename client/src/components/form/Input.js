import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange, error, errorMessage, ...props }) => {
  return (
    <Fragment>
      <input
        className={`input ${error ? 'is-danger' : ''}`}
        onChange={(e) => onChange(e.target.value)}
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
