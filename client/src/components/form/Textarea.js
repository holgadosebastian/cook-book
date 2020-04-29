import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  value,
  placeholder,
  onChange,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <Fragment>
      <textarea
        id={id}
        className={`textarea ${error ? 'is-danger' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      ></textarea>
      {error && errorMessage !== '' && (
        <p className='help is-danger'>{errorMessage}</p>
      )}
    </Fragment>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
