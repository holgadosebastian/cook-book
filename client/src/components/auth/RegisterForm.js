import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../elements/button';
import FormField from '../form/FormField';
import Message from '../elements/message';
import AuthContext from '../../context/auth/authContext';

const RegisterForm = () => {
  const authContext = useContext(AuthContext);
  const { registerUser, errors, loading } = authContext;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [secret, setSecret] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
    password2: null,
    secret: null
  });

  const onSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    let errors = {
      ...validate('username', username),
      ...validate('password', password),
      ...validate('password2', password2),
      ...validate('secret', secret)
    };

    // eslint-disable-next-line
    Object.values(errors).map((error) => {
      if (error !== null) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      registerUser({
        firstName,
        lastName,
        username,
        password,
        secret
      });
    } else {
      setFormErrors(errors);
    }
  };

  const validate = (type, value) => {
    let errors = {};

    switch (type) {
      case 'username':
        if (value === '') {
          errors[type] = 'Username is required';
        } else if (value.length < 6) {
          errors[type] = 'Username is too short, minimum 6 characters';
        } else {
          errors[type] = null;
        }
        break;
      case 'password':
        if (value === '') {
          errors[type] = 'Password is required';
        } else if (value.length < 6) {
          errors[type] = 'Password is too short, minimum 6 characters';
        } else {
          errors[type] = null;
        }
        break;
      case 'password2':
        if (value !== password) {
          errors[type] = 'Passwords do not match';
        } else {
          errors[type] = null;
        }
        break;
      case 'secret':
        if (value === '') {
          errors[type] = 'Secret is required to make an account';
        } else {
          errors[type] = null;
        }
        break;
      default:
        return errors;
    }

    return errors;
  };

  const onValidateInput = (type, value) => {
    let error = validate(type, value);

    setFormErrors({
      ...formErrors,
      ...error
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
            onBlur={(e) => onValidateInput('username', e.target.value)}
            error={formErrors.username !== null}
            errorMessage={formErrors.username}
            required
          />

          <FormField
            id='password'
            name='Password'
            value={password}
            onChange={setPassword}
            type='password'
            onBlur={(e) => onValidateInput('password', e.target.value)}
            error={formErrors.password !== null}
            errorMessage={formErrors.password}
            required
          />

          <FormField
            id='password2'
            name='Confirm Password'
            value={password2}
            onChange={setPassword2}
            type='password'
            onBlur={(e) => onValidateInput('password2', e.target.value)}
            error={formErrors.password2 !== null}
            errorMessage={formErrors.password2}
            required
          />

          <FormField
            id='secret'
            name='Secret'
            value={secret}
            onChange={setSecret}
            onBlur={(e) => onValidateInput('secret', e.target.value)}
            error={formErrors.secret !== null}
            errorMessage={formErrors.secret}
            required
          />

          {errors && errors.length && (
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
          Log In
        </Link>
      </p>
    </Fragment>
  );
};

export default RegisterForm;
