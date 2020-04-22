import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../elements/Button';
import FormField from '../form/FormField';
import Message from '../common/Message';
import AuthContext from '../../context/auth/authContext';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { loginUser, setUserErrors, errors, loading } = authContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    }

    if (!!submitErrors.length) {
      setUserErrors(submitErrors);
      return false;
    }

    loginUser({
      username,
      password
    });
  };

  return (
    <Fragment>
      <div className='box'>
        <p
          className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
          style={{ marginBottom: '24px' }}
        >
          Login to{' '}
          <span className='has-text-grey-darker has-text-weight-normal'>
            Recipgeek
          </span>
        </p>
        <form onSubmit={onSubmit}>
          <FormField
            id='username'
            name='Username'
            value={username}
            onChange={setUsername}
          />

          <FormField
            id='password'
            name='Password'
            value={password}
            type='password'
            onChange={setPassword}
          />

          <Message messageList={errors} />

          <Button
            style={{ marginTop: '24px' }}
            cssClasses='is-fullwidth'
            loading={loading}
            type='submit'
          >
            Login
          </Button>
        </form>
      </div>
      <p className='has-text-centered has-text-grey has-font-weight-light'>
        Don't have an account yet?{' '}
        <Link
          to='/register'
          style={{ textDecoration: 'underline' }}
          className='has-text-primary'
        >
          Register
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
