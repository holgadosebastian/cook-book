import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../elements/Button';
import FormField from '../form/FormField';
import Message from '../common/Message';
import AuthContext from '../../context/auth/authContext';

const RegisterForm = () => {
  const authContext = useContext(AuthContext);
  const { registerUser, setUserErrors, errors, loading } = authContext;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [secret, setSecret] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    let submitErrors = [];

    if (username === '') {
      submitErrors.push({
        msg: 'Username is required'
      });
    }

    if (password === '') {
      submitErrors.push({
        msg: 'Password is required'
      });
    } else if (password !== password2) {
      submitErrors.push({
        msg: 'Passwords do not match'
      });
    }

    if (secret === '') {
      submitErrors.push({
        msg: 'Secret is required'
      });
    }

    if (!!submitErrors.length) {
      setUserErrors(submitErrors);
      return false;
    }

    registerUser({
      firstName,
      lastName,
      username,
      password,
      secret
    });
  };

  return (
    <Fragment>
      <div className='box'>
        <p
          className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
          style={{ marginBottom: '24px' }}
        >
          Register an Account
        </p>
        <form onSubmit={onSubmit}>
          <div className='columns is-mobile'>
            <div
              style={{
                paddingBottom: '0px'
              }}
              className='column'
            >
              <FormField
                id='firstname'
                name='First Name'
                value={firstName}
                onChange={setFirstName}
              />
            </div>
            <div
              style={{
                paddingBottom: '0px'
              }}
              className='column'
            >
              <FormField
                id='lastname'
                name='Last Name'
                value={lastName}
                onChange={setLastName}
              />
            </div>
          </div>

          <FormField
            id='username'
            name='Username'
            value={username}
            onChange={setUsername}
            required
          />

          <FormField
            id='password'
            name='Password'
            value={password}
            onChange={setPassword}
            type='password'
            required
          />

          <FormField
            id='password2'
            name='Confirm Password'
            value={password2}
            onChange={setPassword2}
            type='password'
            required
          />

          <FormField
            id='secret'
            name='Secret'
            value={secret}
            onChange={setSecret}
            required
          />

          <Message messageList={errors} />

          <Button
            style={{ marginTop: '24px' }}
            cssClasses='is-fullwidth'
            loading={loading}
            type='submit'
          >
            Register
          </Button>
        </form>
      </div>
      <p className='has-text-centered has-text-grey has-font-weight-light'>
        Already have an account?{' '}
        <Link
          to='/login'
          style={{ textDecoration: 'underline' }}
          className='has-text-primary'
        >
          Login
        </Link>
      </p>
    </Fragment>
  );
};

export default RegisterForm;
