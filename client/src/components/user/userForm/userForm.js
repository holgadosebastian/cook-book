import React, { Fragment, useEffect, useState } from 'react';
import { FormField } from '../../form';
import Columns from '../../elements/columns';
import Button from '../../elements/button';

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
      <Columns>
        <Columns.Column>
          <FormField
            id='firstname'
            name='First Name'
            value={updatedFirstName}
            onChange={setUpdatedFirstName}
          />
        </Columns.Column>
        <Columns.Column>
          <FormField
            id='lastname'
            name='Last Name'
            value={updatedLastName}
            onChange={setUpdatedLastName}
          />
        </Columns.Column>
      </Columns>

      {/* <FormField id='username' name='Username' value={user.username} disabled /> */}

      <Button color='info' onClick={onSubmit}>
        Update
      </Button>
    </Fragment>
  );
};

export default UserForm;
