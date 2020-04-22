import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Input from './Input';

const FormField = ({ id, name, type = 'text', value, onChange, required }) => {
  return (
    <div className='field'>
      <Label name={name} htmlFor={id} required={required} />
      <div className='control'>
        <Input id={id} value={value} onChange={onChange} type={type} />
      </div>
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default FormField;
