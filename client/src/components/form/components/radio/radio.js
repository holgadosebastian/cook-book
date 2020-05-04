import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ id, label, value, onChange, checked }) => {
  // Transforms true and false string values to boolean
  const stringToBoolean = (val) => {
    if (val.toLowerCase() === 'true') {
      return true;
    }

    if (val.toLowerCase() === 'false') {
      return false;
    }

    return val;
  };

  return (
    <label className='radio'>
      <input
        type='radio'
        onChange={(e) => onChange(stringToBoolean(e.target.value))}
        value={value}
        checked={checked}
      />{' '}
      {label}
    </label>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default Radio;
