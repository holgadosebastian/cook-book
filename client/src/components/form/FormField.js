import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';

const FormField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  ...rest
}) => {
  return (
    <div className='field'>
      <Label name={name} htmlFor={id} required={required} />
      <div className='control'>
        {type === 'textarea' ? (
          <Textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
          />
        ) : (
          <Input
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
        )}
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
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default FormField;
