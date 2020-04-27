import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from '../elements/Button';

const FormAddons = ({
  value,
  onChange,
  onKeyDown,
  buttonColor,
  buttonText,
  onClick
}) => {
  return (
    <div className='field has-addons'>
      <div className='control is-expanded'>
        <Input
          value={value}
          placeholder='Type your search'
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className='control'>
        <Button color={buttonColor} rounded={false} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

FormAddons.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FormAddons;
