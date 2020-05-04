import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../elements/button';
import { FormField } from '../../form';
import Message from '../../elements/message';
import validate from '../../../utils/validate';
import AuthContext from '../../../context/auth/authContext';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { loginUser, errors, loading } = authContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null
  });

  const onValidateInput = (type, value) => {
    let error = {};
    error[type] = validate(type, value);

    setFormErrors({
      ...formErrors,
      ...error
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    let errors = {
      username: validate('username', username),
      password: validate('password', password)
    };

    // eslint-disable-next-line
    Object.values(errors).map((error) => {
      if (error !== null) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      loginUser({
        username,
        password
      });
    } else {
      setFormErrors(errors);
    }
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
            onBlur={(e) => onValidateInput('username', e.target.value)}
            error={formErrors.username !== null}
            errorMessage={formErrors.username}
          />

          <FormField
            id='password'
            name='Password'
            value={password}
            type='password'
            onChange={setPassword}
            onBlur={(e) => onValidateInput('password', e.target.value)}
            error={formErrors.password !== null}
            errorMessage={formErrors.password}
          />

          {errors && !!errors.length && (
            <Message>
              <Message.List messageList={errors} />
            </Message>
          )}

          <Button
            style={{ marginTop: '24px' }}
            loading={loading}
            fullwidth
            type='submit'
          >
            Log In
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
