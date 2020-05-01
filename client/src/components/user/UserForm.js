import React, { Fragment, useEffect, useState } from 'react';
import FormField from '../form/FormField';
import Button from '../elements/Button';

const UserForm = ({ user, onFormSubmit }) => {
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');

  useEffect(() => {
    setUpdatedFirstName(user.firstName);
    setUpdatedLastName(user.lastName);
  }, [user]);

  const onSubmit = () => {
    const userData = {
      id: user._id,
      firstName: updatedFirstName,
      lastName: updatedLastName
    };

    onFormSubmit(userData);
  };

  return (
    <Fragment>
      <div className='columns'>
        <div className='column'>
          <FormField
            id='firstname'
            name='First Name'
            value={updatedFirstName}
            onChange={setUpdatedFirstName}
          />
        </div>
        <div className='column'>
          <FormField
            id='lastname'
            name='Last Name'
            value={updatedLastName}
            onChange={setUpdatedLastName}
          />
        </div>
      </div>

      <FormField id='username' name='Username' value={user.username} disabled />

      <Button color='info' onClick={onSubmit}>
        Update
      </Button>
    </Fragment>
  );
};

export default UserForm;
