import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';

const FormField = ({ id, name, type, required, ...props }) => {
  return (
    <div className='field'>
      <Label name={name} htmlFor={id} required={required} />
      <div className='control'>
        {type === 'textarea' ? (
          <Textarea id={id} {...props} />
        ) : (
          <Input id={id} type={type} {...props} />
        )}
      </div>
    </div>
  );
};

FormField.defaultProps = {
  id: undefined,
  name: undefined,
  type: 'text',
  placeholder: null,
  required: false,
  disabled: false,
  error: false,
  errorMessage: ''
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default FormField;
