import React from 'react';
import Label from './Label';
import Input from './Input';

const FormField = ({ name, id, type = 'text', value, onChange, required }) => {
  return (
    <div className='field'>
      {/* <label
        className='label is-uppercase has-text-weight-light has-text-grey-darker'
        htmlFor='title'
      >
        Title <span className='has-text-danger'>*</span>
      </label> */}
      <Label name={name} htmlFor={id} required={required} />
      <div className='control'>
        {/* <input
          id='title'
          className='input'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <Input id={id} value={value} onChange={onChange} type={type} />
      </div>
    </div>
  );
};

export default FormField;
